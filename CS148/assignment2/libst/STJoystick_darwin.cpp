/* libST Joystick Implementation
 * Darwin Specific Code
 * Adapted directly from libSDL, uses IOKit to do the heavy
 * lifting.  To build you need to link to IOKit and AppKit
 * frameworks. 
 */

/*
  SDL - Simple DirectMedia Layer
    Copyright (C) 1997-2004 Sam Lantinga

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Library General Public
  License as published by the Free Software Foundation; either
  version 2 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Library General Public License for more details.

  You should have received a copy of the GNU Library General Public
  License along with this library; if not, write to the Free
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

  Sam Lantinga
  slouken@libsdl.org
*/

#ifndef _ST_JOYSTICK_DARWIN_H_
#define _ST_JOYSTICK_DARWIN_H_

#include "STJoystick.h"

#include <unistd.h>
#include <ctype.h>
#include <sysexits.h>
#include <mach/mach.h>
#include <mach/mach_error.h>
#include <IOKit/IOKitLib.h>
#include <IOKit/IOCFPlugIn.h>
#ifdef MACOS_10_0_4
#include <IOKit/hidsystem/IOHIDUsageTables.h>
#else
/* The header was moved here in Mac OS X 10.1 */
#include <Kernel/IOKit/hidsystem/IOHIDUsageTables.h>
#endif
#include <IOKit/hid/IOHIDLib.h>
#include <IOKit/hid/IOHIDKeys.h>
#include <CoreFoundation/CoreFoundation.h>
#include <Carbon/Carbon.h> /* for NewPtrClear, DisposePtr */

/**** START IOKit structs and Functions ******/

struct recElement
{
  IOHIDElementCookie cookie;        /* unique value which identifies element, will NOT change */
  long min;                /* reported min value possible */
  long max;                /* reported max value possible */
#if 0
  /* TODO: maybe should handle the following stuff somehow? */

  long scaledMin;              /* reported scaled min value possible */
  long scaledMax;              /* reported scaled max value possible */
  long size;                /* size in bits of data return from element */
  Boolean relative;            /* are reports relative to last report (deltas) */
  Boolean wrapping;            /* does element wrap around (one value higher than max is min) */
  Boolean nonLinear;            /* are the values reported non-linear relative to element movement */
  Boolean preferredState;          /* does element have a preferred state (such as a button) */
  Boolean nullState;            /* does element have null state */
#endif /* 0 */

  /* runtime variables used for auto-calibration */
  long minReport;              /* min returned value */
  long maxReport;              /* max returned value */
  
  struct recElement * pNext;        /* next element in list */
};
typedef struct recElement recElement;

struct joystick_hwdata
{
  IOHIDDeviceInterface ** interface;    /* interface to device, NULL = no interface */

  char product[256];              /* name of product */
  long usage;                /* usage page from IOUSBHID Parser.h which defines general usage */
  long usagePage;              /* usage within above page from IOUSBHID Parser.h which defines specific usage */

  long axes;                /* number of axis (calculated, not reported by device) */
  long buttons;              /* number of buttons (calculated, not reported by device) */
  long hats;                /* number of hat switches (calculated, not reported by device) */
  long elements;              /* number of total elements (shouldbe total of above) (calculated, not reported by device) */

  recElement* firstAxis;
  recElement* firstButton;
  recElement* firstHat;

  int removed;
  int uncentered;

  struct joystick_hwdata* pNext;      /* next device */
};
typedef struct joystick_hwdata recDevice;

void HIDReportError (char * strError);

recDevice *HIDBuildDevice (io_object_t hidDevice);
recDevice *HIDDisposeDevice (recDevice **ppDevice);
SInt32 HIDScaledCalibratedValue (recDevice *pDevice, recElement *pElement, long min, long max);
SInt32 HIDGetElementValue (recDevice *pDevice, recElement *pElement); 

/* SDL joystick driver for Darwin / Mac OS X, based on the IOKit HID API */
/* Written 2001 by Max Horn */

/* Linked list of all available devices */
recDevice *gpDeviceList = NULL;

static void HIDGetCollectionElements (CFMutableDictionaryRef deviceProperties, recDevice *pDevice);

/* returns current value for element, polling element
 * will return 0 on error conditions which should be accounted for by application
 */
SInt32 HIDGetElementValue (recDevice *pDevice, recElement *pElement)
{
  IOReturn result = kIOReturnSuccess;
  IOHIDEventStruct hidEvent;
  hidEvent.value = 0;
  
  if (NULL != pDevice && NULL != pElement && NULL != pDevice->interface)
  {
    result = (*(pDevice->interface))->getElementValue(pDevice->interface, pElement->cookie, &hidEvent);
    if (kIOReturnSuccess == result)
    {
      /* record min and max for auto calibration */
      if (hidEvent.value < pElement->minReport)
        pElement->minReport = hidEvent.value;
      if (hidEvent.value > pElement->maxReport)
        pElement->maxReport = hidEvent.value;
    }
  }

  /* auto user scale */
  return hidEvent.value;
}

SInt32 HIDScaledCalibratedValue (recDevice *pDevice, recElement *pElement, long min, long max)
{
  float deviceScale = max - min;
  float readScale = pElement->maxReport - pElement->minReport;
  
  SInt32 value = HIDGetElementValue(pDevice, pElement);
  
  if (readScale == 0)
    return value; // no scaling at all
  else
    return ((value - pElement->minReport) * deviceScale / readScale) + min;
}


static void HIDRemovalCallback(void * target,
                               IOReturn result,
                               void * refcon,
                               void * sender)
{
  recDevice *device = (recDevice *) refcon;
  device->removed = 1;
  device->uncentered = 1;
}

/* Create and open an interface to device, required prior to extracting values or building queues.
 * Note: appliction now owns the device and must close and release it prior to exiting
 */
static IOReturn HIDCreateOpenDeviceInterface (io_object_t hidDevice, recDevice *pDevice)
{
  IOReturn result = kIOReturnSuccess;
  HRESULT plugInResult = S_OK;
  SInt32 score = 0;
  IOCFPlugInInterface ** ppPlugInInterface = NULL;
  
  if (NULL == pDevice->interface)
  {
    result = IOCreatePlugInInterfaceForService (hidDevice, kIOHIDDeviceUserClientTypeID,
                          kIOCFPlugInInterfaceID, &ppPlugInInterface, &score);
    if (kIOReturnSuccess == result)
    {
      /* Call a method of the intermediate plug-in to create the device interface */
      plugInResult = (*ppPlugInInterface)->QueryInterface (ppPlugInInterface,
                CFUUIDGetUUIDBytes (kIOHIDDeviceInterfaceID), (void **) &(pDevice->interface));
      if (S_OK != plugInResult)
        HIDReportError ("CouldnÕt query HID class device interface from plugInInterface");
      (*ppPlugInInterface)->Release (ppPlugInInterface);
    }
    else
      HIDReportError ("Failed to create **plugInInterface via IOCreatePlugInInterfaceForService.");
  }
  if (NULL != pDevice->interface)
  {
    result = (*(pDevice->interface))->open (pDevice->interface, 0);
    if (kIOReturnSuccess != result)
      HIDReportError ("Failed to open pDevice->interface via open.");
    else
      (*(pDevice->interface))->setRemovalCallback (pDevice->interface, HIDRemovalCallback, pDevice, pDevice);

  }
  return result;
}

/* Closes and releases interface to device, should be done prior to exting application
 * Note: will have no affect if device or interface do not exist
 * application will "own" the device if interface is not closed
 * (device may have to be plug and re-plugged in different location to get it working again without a restart)
 */
static IOReturn HIDCloseReleaseInterface (recDevice *pDevice)
{
  IOReturn result = kIOReturnSuccess;
  
  if ((NULL != pDevice) && (NULL != pDevice->interface))
  {
    /* close the interface */
    result = (*(pDevice->interface))->close (pDevice->interface);
    if (kIOReturnNotOpen == result)
    {
      /* do nothing as device was not opened, thus can't be closed */
    }
    else if (kIOReturnSuccess != result)
      HIDReportError ("Failed to close IOHIDDeviceInterface.");
    /* release the interface */
    result = (*(pDevice->interface))->Release (pDevice->interface);
    if (kIOReturnSuccess != result)
      HIDReportError ("Failed to release IOHIDDeviceInterface.");
    pDevice->interface = NULL;
  }  
  return result;
}

/* extracts actual specific element information from each element CF dictionary entry */
static void HIDGetElementInfo (CFTypeRef refElement, recElement *pElement)
{
  long number;
  CFTypeRef refType;

  refType = CFDictionaryGetValue ((const __CFDictionary*)refElement, CFSTR(kIOHIDElementCookieKey));
  if (refType && CFNumberGetValue ((const __CFNumber*)refType, kCFNumberLongType, &number))
    pElement->cookie = (IOHIDElementCookie) number;
  refType = CFDictionaryGetValue ((const __CFDictionary*)refElement, CFSTR(kIOHIDElementMinKey));
  if (refType && CFNumberGetValue ((const __CFNumber*)refType, kCFNumberLongType, &number))
    pElement->min = number;
    pElement->maxReport = pElement->min;
  refType = CFDictionaryGetValue ((const __CFDictionary*)refElement, CFSTR(kIOHIDElementMaxKey));
  if (refType && CFNumberGetValue ((const __CFNumber*)refType, kCFNumberLongType, &number))
    pElement->max = number;
    pElement->minReport = pElement->max;
/*
  TODO: maybe should handle the following stuff somehow?

  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementScaledMinKey));
  if (refType && CFNumberGetValue (refType, kCFNumberLongType, &number))
    pElement->scaledMin = number;
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementScaledMaxKey));
  if (refType && CFNumberGetValue (refType, kCFNumberLongType, &number))
    pElement->scaledMax = number;
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementSizeKey));
  if (refType && CFNumberGetValue (refType, kCFNumberLongType, &number))
    pElement->size = number;
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementIsRelativeKey));
  if (refType)
    pElement->relative = CFBooleanGetValue (refType);
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementIsWrappingKey));
  if (refType)
    pElement->wrapping = CFBooleanGetValue (refType);
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementIsNonLinearKey));
  if (refType)
    pElement->nonLinear = CFBooleanGetValue (refType);
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementHasPreferedStateKey));
  if (refType)
    pElement->preferredState = CFBooleanGetValue (refType);
  refType = CFDictionaryGetValue (refElement, CFSTR(kIOHIDElementHasNullStateKey));
  if (refType)
    pElement->nullState = CFBooleanGetValue (refType);
*/
}      

/* examines CF dictionary vlaue in device element hierarchy to determine if it is element of interest or a collection of more elements
 * if element of interest allocate storage, add to list and retrieve element specific info
 * if collection then pass on to deconstruction collection into additional individual elements
 */
static void HIDAddElement (CFTypeRef refElement, recDevice* pDevice)
{
  recElement* element = NULL;
  recElement** headElement = NULL;
  long elementType, usagePage, usage;
  CFTypeRef refElementType = CFDictionaryGetValue ((const __CFDictionary*)refElement, CFSTR(kIOHIDElementTypeKey));
  CFTypeRef refUsagePage = CFDictionaryGetValue ((const __CFDictionary*)refElement, CFSTR(kIOHIDElementUsagePageKey));
  CFTypeRef refUsage = CFDictionaryGetValue ((const __CFDictionary*)refElement, CFSTR(kIOHIDElementUsageKey));


  if ((refElementType) && (CFNumberGetValue ((const __CFNumber*)refElementType, kCFNumberLongType, &elementType)))
  {
    /* look at types of interest */
    if ((elementType == kIOHIDElementTypeInput_Misc) || (elementType == kIOHIDElementTypeInput_Button) ||
      (elementType == kIOHIDElementTypeInput_Axis))
    {
      if (refUsagePage && CFNumberGetValue ((const __CFNumber*)refUsagePage, kCFNumberLongType, &usagePage) &&
        refUsage && CFNumberGetValue ((const __CFNumber*)refUsage, kCFNumberLongType, &usage))
      {
        switch (usagePage) /* only interested in kHIDPage_GenericDesktop and kHIDPage_Button */
        {
          case kHIDPage_GenericDesktop:
            {
              switch (usage) /* look at usage to determine function */
              {
                case kHIDUsage_GD_X:
                case kHIDUsage_GD_Y:
                case kHIDUsage_GD_Z:
                case kHIDUsage_GD_Rx:
                case kHIDUsage_GD_Ry:
                case kHIDUsage_GD_Rz:
                case kHIDUsage_GD_Slider:
                case kHIDUsage_GD_Dial:
                case kHIDUsage_GD_Wheel:
                  element = (recElement *) NewPtrClear (sizeof (recElement));
                  if (element)
                  {
                    pDevice->axes++;
                    headElement = &(pDevice->firstAxis);
                  }
                break;
                case kHIDUsage_GD_Hatswitch:
                  element = (recElement *) NewPtrClear (sizeof (recElement));
                  if (element)
                  {
                    pDevice->hats++;
                    headElement = &(pDevice->firstHat);
                  }
                break;
              }              
            }
            break;
          case kHIDPage_Button:
            element = (recElement *) NewPtrClear (sizeof (recElement));
            if (element)
            {
              pDevice->buttons++;
              headElement = &(pDevice->firstButton);
            }
            break;
          default:
            break;
        }
      }
    }
    else if (kIOHIDElementTypeCollection == elementType)
      HIDGetCollectionElements ((CFMutableDictionaryRef) refElement, pDevice);
  }

  if (element && headElement) /* add to list */
  {
    pDevice->elements++;
    if (NULL == *headElement)
      *headElement = element;
    else
    {
      recElement *elementPrevious, *elementCurrent;
      elementCurrent = *headElement;
      while (elementCurrent)
      {
        elementPrevious = elementCurrent;
        elementCurrent = elementPrevious->pNext;
      }
      elementPrevious->pNext = element;
    }
    element->pNext = NULL;
    HIDGetElementInfo (refElement, element);
  }
}

/* collects information from each array member in device element list (each array memeber = element) */
static void HIDGetElementsCFArrayHandler (const void * value, void * parameter)
{
  if (CFGetTypeID (value) == CFDictionaryGetTypeID ())
    HIDAddElement ((CFTypeRef) value, (recDevice *) parameter);
}

/* handles retrieval of element information from arrays of elements in device IO registry information */
static void HIDGetElements (CFTypeRef refElementCurrent, recDevice *pDevice)
{
  CFTypeID type = CFGetTypeID (refElementCurrent);
  if (type == CFArrayGetTypeID()) /* if element is an array */
  {
    CFRange range = {0, CFArrayGetCount ((const __CFArray*)refElementCurrent)};
    /* CountElementsCFArrayHandler called for each array member */
    CFArrayApplyFunction ((const __CFArray*)refElementCurrent, range, HIDGetElementsCFArrayHandler, pDevice);
  }
}      

/* handles extracting element information from element collection CF types
 * used from top level element decoding and hierarchy deconstruction to flatten device element list
 */
static void HIDGetCollectionElements (CFMutableDictionaryRef deviceProperties, recDevice *pDevice)
{
  CFTypeRef refElementTop = CFDictionaryGetValue (deviceProperties, CFSTR(kIOHIDElementKey));
  if (refElementTop)
    HIDGetElements (refElementTop, pDevice);
}

/* use top level element usage page and usage to discern device usage page and usage setting appropriate vlaues in device record */
static void HIDTopLevelElementHandler (const void * value, void * parameter)
{
  CFTypeRef refCF = 0;
  if (CFGetTypeID (value) != CFDictionaryGetTypeID ())
    return;
  refCF = CFDictionaryGetValue ((const __CFDictionary*)value, CFSTR(kIOHIDElementUsagePageKey));
  if (!CFNumberGetValue ((const __CFNumber*)refCF, kCFNumberLongType, &((recDevice *) parameter)->usagePage))
    HIDReportError ("CFNumberGetValue error retrieving pDevice->usagePage.");
  refCF = CFDictionaryGetValue ((const __CFDictionary*)value, CFSTR(kIOHIDElementUsageKey));
  if (!CFNumberGetValue ((const __CFNumber*)refCF, kCFNumberLongType, &((recDevice *) parameter)->usage))
    HIDReportError ("CFNumberGetValue error retrieving pDevice->usage.");
}

/* extracts device info from CF dictionary records in IO registry */
static void HIDGetDeviceInfo (io_object_t hidDevice, CFMutableDictionaryRef hidProperties, recDevice *pDevice)
{
  CFMutableDictionaryRef usbProperties = 0;
  io_registry_entry_t parent1, parent2;
  
  /* Mac OS X currently is not mirroring all USB properties to HID page so need to look at USB device page also
   * get dictionary for usb properties: step up two levels and get CF dictionary for USB properties
   */
  if ((KERN_SUCCESS == IORegistryEntryGetParentEntry (hidDevice, kIOServicePlane, &parent1)) &&
    (KERN_SUCCESS == IORegistryEntryGetParentEntry (parent1, kIOServicePlane, &parent2)) &&
    (KERN_SUCCESS == IORegistryEntryCreateCFProperties (parent2, &usbProperties, kCFAllocatorDefault, kNilOptions)))
  {
    if (usbProperties)
    {
      CFTypeRef refCF = 0;
      /* get device info
       * try hid dictionary first, if fail then go to usb dictionary
       */
      
      
      /* get product name */
      refCF = CFDictionaryGetValue (hidProperties, CFSTR(kIOHIDProductKey));
      if (!refCF)
        refCF = CFDictionaryGetValue (usbProperties, CFSTR("USB Product Name"));
      if (refCF)
      {
        if (!CFStringGetCString ((const __CFString*)refCF, pDevice->product, 256, CFStringGetSystemEncoding ()))
          HIDReportError ("CFStringGetCString error retrieving pDevice->product.");
      }
      
      /* get usage page and usage */
      refCF = CFDictionaryGetValue (hidProperties, CFSTR(kIOHIDPrimaryUsagePageKey));
      if (refCF)
      {
        if (!CFNumberGetValue ((const __CFNumber*)refCF, kCFNumberLongType, &pDevice->usagePage))
          HIDReportError ("CFNumberGetValue error retrieving pDevice->usagePage.");
        refCF = CFDictionaryGetValue (hidProperties, CFSTR(kIOHIDPrimaryUsageKey));
        if (refCF)
          if (!CFNumberGetValue ((const __CFNumber*)refCF, kCFNumberLongType, &pDevice->usage))
            HIDReportError ("CFNumberGetValue error retrieving pDevice->usage.");
      }

      if (NULL == refCF) /* get top level element HID usage page or usage */
      {
        /* use top level element instead */
        CFTypeRef refCFTopElement = 0;
        refCFTopElement = CFDictionaryGetValue (hidProperties, CFSTR(kIOHIDElementKey));
        {
          /* refCFTopElement points to an array of element dictionaries */
          CFRange range = {0, CFArrayGetCount ((const __CFArray*)refCFTopElement)};
          CFArrayApplyFunction ((const __CFArray*)refCFTopElement, range, HIDTopLevelElementHandler, pDevice);
        }
      }

      CFRelease (usbProperties);
    }
    else
      HIDReportError ("IORegistryEntryCreateCFProperties failed to create usbProperties.");

    if (kIOReturnSuccess != IOObjectRelease (parent2))
      HIDReportError ("IOObjectRelease error with parent2.");
    if (kIOReturnSuccess != IOObjectRelease (parent1))
      HIDReportError ("IOObjectRelease error with parent1.");
  }
}

recDevice *HIDBuildDevice (io_object_t hidDevice)
{
  recDevice *pDevice = (recDevice *) NewPtrClear (sizeof (recDevice));
  if (pDevice)
  {
    /* get dictionary for HID properties */
    CFMutableDictionaryRef hidProperties = 0;
    kern_return_t result = IORegistryEntryCreateCFProperties (hidDevice, &hidProperties, kCFAllocatorDefault, kNilOptions);
    if ((result == KERN_SUCCESS) && hidProperties)
    {
      /* create device interface */
      result = HIDCreateOpenDeviceInterface (hidDevice, pDevice);
      if (kIOReturnSuccess == result)
      {
        HIDGetDeviceInfo (hidDevice, hidProperties, pDevice); /* hidDevice used to find parents in registry tree */
        HIDGetCollectionElements (hidProperties, pDevice);
      }
      else
      {
        DisposePtr((Ptr)pDevice);
        pDevice = NULL;
      }
      CFRelease (hidProperties);
    }
    else
    {
      DisposePtr((Ptr)pDevice);
      pDevice = NULL;
    }
  }
  return pDevice;
}

/* disposes of the element list associated with a device and the memory associated with the list */
static void HIDDisposeElementList (recElement **elementList)
{
  recElement *pElement = *elementList;
  while (pElement)
  {
    recElement *pElementNext = pElement->pNext;
    DisposePtr ((Ptr) pElement);
    pElement = pElementNext;
  }
  *elementList = NULL;
}

/* disposes of a single device, closing and releaseing interface, freeing memory fro device and elements, setting device pointer to NULL
 * all your device no longer belong to us... (i.e., you do not 'own' the device anymore)
 */
recDevice *HIDDisposeDevice (recDevice **ppDevice)
{
  kern_return_t result = KERN_SUCCESS;
  recDevice *pDeviceNext = NULL;
  if (*ppDevice)
  {
    /* save next device prior to disposing of this device */
    pDeviceNext = (*ppDevice)->pNext;
    
    /* free element lists */
    HIDDisposeElementList (&(*ppDevice)->firstAxis);
    HIDDisposeElementList (&(*ppDevice)->firstButton);
    HIDDisposeElementList (&(*ppDevice)->firstHat);
    
    result = HIDCloseReleaseInterface (*ppDevice); /* function sanity checks interface value (now application does not own device) */
    if (kIOReturnSuccess != result)
      HIDReportError ("HIDCloseReleaseInterface failed when trying to dipose device.");
    DisposePtr ((Ptr)*ppDevice);
    *ppDevice = NULL;
  }
  return pDeviceNext;
}

void HIDReportError (char * strError)
{
  STJoystick::Error(strError);
}

/**** END IOKit structs and Functions ******/


/**** START STJoystick Functions ******/

/* Function to scan the system for joysticks.
 * Joystick 0 should be the system default joystick.
 * This function should return the number of available joysticks, or -1
 * on an unrecoverable fatal error.
 */
int STJoystick::Sys_Initialize()
{
  IOReturn result = kIOReturnSuccess;
  mach_port_t masterPort = 0;
  io_iterator_t hidObjectIterator = 0;
  CFMutableDictionaryRef hidMatchDictionary = NULL;
  recDevice *device, *lastDevice;
  io_object_t ioHIDDeviceObject = 0;
  
  num_joysticks = 0;
  
  if (gpDeviceList)
  {
    STJoystick::Error("Joystick: Device list already inited.");
    return -1;
  }
  
  result = IOMasterPort (bootstrap_port, &masterPort);
  if (kIOReturnSuccess != result)
  {
    STJoystick::Error("Joystick: IOMasterPort error with bootstrap_port.");
    return -1;
  }

  /* Set up a matching dictionary to search I/O Registry by class name for all HID class devices. */
  hidMatchDictionary = IOServiceMatching (kIOHIDDeviceKey);
  if (hidMatchDictionary)
  {
    /* Add key for device type (joystick, in this case) to refine the matching dictionary. */
    
    /* NOTE: we now perform this filtering later
    UInt32 usagePage = kHIDPage_GenericDesktop;
    UInt32 usage = kHIDUsage_GD_Joystick;
    CFNumberRef refUsage = NULL, refUsagePage = NULL;

    refUsage = CFNumberCreate (kCFAllocatorDefault, kCFNumberIntType, &usage);
    CFDictionarySetValue (hidMatchDictionary, CFSTR (kIOHIDPrimaryUsageKey), refUsage);
    refUsagePage = CFNumberCreate (kCFAllocatorDefault, kCFNumberIntType, &usagePage);
    CFDictionarySetValue (hidMatchDictionary, CFSTR (kIOHIDPrimaryUsagePageKey), refUsagePage);
    */
  }
  else
  {
    STJoystick::Error("Joystick: Failed to get HID CFMutableDictionaryRef via IOServiceMatching.");
    return -1;
  }
  
  /*/ Now search I/O Registry for matching devices. */
  result = IOServiceGetMatchingServices (masterPort, hidMatchDictionary, &hidObjectIterator);
  /* Check for errors */
  if (kIOReturnSuccess != result)
  {
    STJoystick::Error("Joystick: Couldn't create a HID object iterator.");
    return -1;
  }
  if (!hidObjectIterator) /* there are no joysticks */
  {
    gpDeviceList = NULL;
    num_joysticks = 0;
    return 0;
  }
  /* IOServiceGetMatchingServices consumes a reference to the dictionary, so we don't need to release the dictionary ref. */

  /* build flat linked list of devices from device iterator */

  gpDeviceList = lastDevice = NULL;
  
  while ((ioHIDDeviceObject = IOIteratorNext (hidObjectIterator)))
  {
    /* build a device record */
    device = HIDBuildDevice (ioHIDDeviceObject);
    if (!device)
      continue;

    /* dump device object, it is no longer needed */
    result = IOObjectRelease (ioHIDDeviceObject);
/*    if (KERN_SUCCESS != result)
      HIDReportErrorNum ("IOObjectRelease error with ioHIDDeviceObject.", result);
*/

    /* Filter device list to non-keyboard/mouse stuff */ 
    if ( (device->usagePage != kHIDPage_GenericDesktop) ||
         ((device->usage != kHIDUsage_GD_Joystick &&
          device->usage != kHIDUsage_GD_GamePad)) ) {

      /* release memory for the device */
      HIDDisposeDevice (&device);
      DisposePtr((Ptr)device);
      continue;
    }
    
    /* Add device to the end of the list */
    if (lastDevice)
      lastDevice->pNext = device;
    else
      gpDeviceList = device;
    lastDevice = device;
  }
  result = IOObjectRelease (hidObjectIterator); /* release the iterator */

  /* Count the total number of devices we found */
  device = gpDeviceList;
  while (device)
  {
    num_joysticks++;
    device = device->pNext;
  }
  
  return num_joysticks;
}

/* Function to get the device-dependent name of a joystick */
const char* STJoystick::Sys_GetName(int index)
{
  recDevice *device = gpDeviceList;
  
  for (; index > 0; index--)
    device = device->pNext;

  return device->product;
}

/* Function to open a joystick for use.  Opens the device_index'th
 * joystick attached to the system.
 * This should fill the nbuttons and naxes fields of the joystick structure.
 * It returns 0, or -1 if there is an error.
 */
int STJoystick::Sys_OpenJoystick(int device_index)
{
  recDevice *device = gpDeviceList;
  int index;
  
  for (index = device_index; index > 0; index--)
    device = device->pNext;

  joysticks[device_index]->hwdata = device;
  joysticks[device_index]->name = device->product;

  joysticks[device_index]->naxes = device->axes;
  joysticks[device_index]->nhats = device->hats;
  joysticks[device_index]->nballs = 0;
  joysticks[device_index]->nbuttons = device->buttons;

  return 0;
}

/* Function to update the state of a joystick - called as a device poll. */
void STJoystick::Sys_Update()
{
  recDevice *device = joystick_data->hwdata;
  recElement *element;
  SInt32 value;
  int i;

  if (device->removed)  /* device was unplugged; ignore it. */
  {
    if (device->uncentered)
    {
      device->uncentered = 0;

      /* Tell the app that everything is centered/unpressed... */
      for (i = 0; i < device->axes; i++)
        joystick_data->axes[i] = 0;

      for (i = 0; i < device->buttons; i++)
        joystick_data->buttons[i] = 0;

      for (i = 0; i < device->hats; i++)
        joystick_data->hats[i] = ST_JOYSTICK_HAT_CENTERED;
    }

    return;
  }

  element = device->firstAxis;
  i = 0;
  while (element)
  {
    value = HIDGetElementValue(device, element);
    if ( value != joystick_data->axes[i] )
      joystick_data->axes[i] = value;
    element = element->pNext;
    ++i;
  }
  
  element = device->firstButton;
  i = 0;
  while (element)
  {
    value = HIDGetElementValue(device, element);
        if (value > 1)  /* handle pressure-sensitive buttons */
            value = 1;
    if ( value != joystick_data->buttons[i] )
      joystick_data->buttons[i] = value;
    element = element->pNext;
    ++i;
  }
      
  element = device->firstHat;
  i = 0;
  while (element)
  {
    unsigned char pos = 0;

    value = HIDGetElementValue(device, element);
    if (element->max == 3) /* 4 position hatswitch - scale up value */
      value *= 2;
    else if (element->max != 7) /* Neither a 4 nor 8 positions - fall back to default position (centered) */
      value = -1;
    switch(value)
    {
      case 0:
        pos = ST_JOYSTICK_HAT_UP;
        break;
      case 1:
        pos = ST_JOYSTICK_HAT_RIGHTUP;
        break;
      case 2:
        pos = ST_JOYSTICK_HAT_RIGHT;
        break;
      case 3:
        pos = ST_JOYSTICK_HAT_RIGHTDOWN;
        break;
      case 4:
        pos = ST_JOYSTICK_HAT_DOWN;
        break;
      case 5:
        pos = ST_JOYSTICK_HAT_LEFTDOWN;
        break;
      case 6:
        pos = ST_JOYSTICK_HAT_LEFT;
        break;
      case 7:
        pos = ST_JOYSTICK_HAT_LEFTUP;
        break;
      default:
        /* Every other value is mapped to center. We do that because some
         * joysticks use 8 and some 15 for this value, and apparently
         * there are even more variants out there - so we try to be generous.
         */
        pos = ST_JOYSTICK_HAT_CENTERED;
        break;
    }
    if ( pos != joystick_data->hats[i] )
      joystick_data->hats[i] = pos;
    element = element->pNext;
    ++i;
  }
  
  return;
}

/* Function to close a joystick after use */
void STJoystick::Sys_Close(int device_index)
{
  /* Should we do anything here? */
  return;
}

/* Function to perform any system-specific joystick related cleanup */
void STJoystick::Sys_Destroy(void)
{
  while (NULL != gpDeviceList)
    gpDeviceList = HIDDisposeDevice (&gpDeviceList);
}

/**** END STJoystick Functions ******/

#endif /* _ST_JOYSTICK_DARWIN_H_ */
