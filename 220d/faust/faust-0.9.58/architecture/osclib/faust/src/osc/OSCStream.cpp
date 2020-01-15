/*
  Copyright (c) Grame 2009

  This library is free software; you can redistribute it and modify it under
  the terms of the GNU Library General Public License as published by the
  Free Software Foundation version 2 of the License, or any later version.

  This library is distributed in the hope that it will be useful, but
  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Library General Public License
  for more details.

  You should have received a copy of the GNU Library General Public License
  along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA.

  Grame Research Laboratory, 9, rue du Garet 69001 Lyon - France
  research@grame.fr
  
*/

#include <iostream>
#include "OSCStream.h"

using namespace std;

namespace oscfaust
{

OSCStream* _oscout = 0;				// OSC standard output stream
OSCStream* _oscerr = 0;				// OSC standard input stream

static UdpSocket* _socket = 0;		// a shared transmit socket


//--------------------------------------------------------------------------
OSCStream::OSCStream ()
	: fState(kIdle), fPort(1024), fAddress(kLocalhost), fOutStream(fBuffer, kOutBufferSize), fSocket(_socket)
{
	if (!fSocket) cerr << "warning: incorrect OSCStream, _socket not initialized" << endl;
}

//--------------------------------------------------------------------------
bool OSCStream::start ()
{
	_socket = new UdpSocket;
	_oscout = new OSCStream(_socket);
	_oscerr = new OSCStream(_socket);
	return (_socket && _oscout && _oscerr);
}

//--------------------------------------------------------------------------
void OSCStream::stop ()
{
	delete _socket;
	delete _oscout;
	delete _oscerr;
	_oscout = _oscerr = 0;
	_socket = 0;
}

//--------------------------------------------------------------------------
void OSCStream::setAddress (const string& address)
{
	IpEndpointName dst (address.c_str());
	setAddress (dst.address);
}

//--------------------------------------------------------------------------
OSCStream& OSCStream::start(const char * address)
{ 
	stream().Clear();
	if (!stream().IsReady()) cerr << "OSCStream OutboundPacketStream not ready" << endl;
	stream() << osc::BeginMessage( address ) ; 
	fState = kInProgress;
	return *this;
}

//--------------------------------------------------------------------------
OSCStream& OSCStream::end()
{
	if (state() == kInProgress) {
		stream() << osc::EndMessage;
		if (fSocket) 
			fSocket->SendTo (IpEndpointName (fAddress, fPort), stream().Data(), stream().Size() );
		fState = kIdle;
	}
	return *this;
}

//--------------------------------------------------------------------------
OSCStream& operator <<(OSCStream& s, const string& val)	
{ 
	s.stream() << val.c_str();
	return s; 
}

//--------------------------------------------------------------------------
OSCStream& operator <<(OSCStream& s, const OSCErr& val)		{ return s.start(val.fAddress); }
OSCStream& operator <<(OSCStream& s, const OSCWarn& val)	{ return s.start(val.fAddress); }
OSCStream& operator <<(OSCStream& s, const OSCStart& val)	{ return s.start(val.fAddress); }
OSCStream& operator <<(OSCStream& s, const OSCEnd val)		{ return s.end(); }

} // end namespace

