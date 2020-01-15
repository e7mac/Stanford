//
//  TUTViewController.m
//  SoundShare
//
//  Created by Michael Rotondo on 2/21/12.
//  Copyright (c) 2012 Rototyping. All rights reserved.
//

#import "TUTViewController.h"
#import "SoundShareClient.h"
#import "AFHTTPRequestOperation.h"
#import <CoreLocation/CoreLocation.h>

#import "mo_audio.h"
#import "FileRead.h"
#import "Stk.h"

#define SRATE 44100
#define FRAMESIZE 512
#define NUMCHANNELS 2

stk::FileRead *fileReader = NULL;
stk::StkFrames *readBuffer;
static int sampleIndex = 0;

void audioCallback(Float32 * buff, UInt32 frameSize, void * userData);
void audioCallback(Float32 * buff, UInt32 frameSize, void * userData)
{
    bool didRead = false;
    if (fileReader && sampleIndex < fileReader->fileSize())
    {
        fileReader->read(*readBuffer, sampleIndex);
        sampleIndex += FRAMESIZE;
        didRead = true;
    }
    for (int i = 0; i < frameSize; i++)
    {
        if (readBuffer && didRead)
        {
            buff[i * NUMCHANNELS] = (*readBuffer)[i * NUMCHANNELS];
            buff[i * NUMCHANNELS + 1] = (*readBuffer)[i * NUMCHANNELS + 1];
        }
        else
        {
            buff[i * NUMCHANNELS] = buff[i * NUMCHANNELS + 1] = 0;
        }
    }
}

@interface TUTViewController ()
{
    SoundShareClient *soundShareClient;
    CLLocationManager *locationManager;
}

- (void)refresh;
- (void)playSoundAtURL:(NSURL *)url;

@end

@implementation TUTViewController
@synthesize soundTableView;
@synthesize nameTextField, descriptionTextField;
@synthesize sounds;

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

- (void)playSoundAtURL:(NSURL *)url
{
    NSData *data = [NSData dataWithContentsOfURL:url];
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *path = [[paths objectAtIndex:0] stringByAppendingPathComponent:@"stuff.wav"];    
    NSLog(@"Tried to write to path: %@", path);
    [data writeToFile:path atomically:NO];
    
    readBuffer = new stk::StkFrames(FRAMESIZE, 2);
    fileReader = new stk::FileRead();
    fileReader->open([path UTF8String]);
    sampleIndex = 0;
}

- (IBAction)uploadSound:(id)sender
{
    [nameTextField resignFirstResponder];
    [descriptionTextField resignFirstResponder];
    
    // UPLOAD A FILE
    NSMutableDictionary *parameters = [NSMutableDictionary dictionary];
    [parameters setObject:nameTextField.text forKey:@"name"];
    [parameters setObject:descriptionTextField.text forKey:@"description"];
    
    CLLocation *location = [locationManager location];
    CLLocationCoordinate2D coordinate = location.coordinate;
    CLLocationDegrees latitude = coordinate.latitude;
    CLLocationDegrees longitude = coordinate.longitude;
    [parameters setObject:[NSNumber numberWithFloat:latitude] forKey:@"lat"];
    [parameters setObject:[NSNumber numberWithFloat:longitude] forKey:@"long"];
    [parameters setObject:[[UIDevice currentDevice] uniqueIdentifier] forKey:@"udid"];
    
    NSMutableURLRequest *myRequest = [soundShareClient multipartFormRequestWithMethod:@"POST" path:@"soundshare/sound" parameters:parameters constructingBodyWithBlock: ^(id <AFMultipartFormData>formData) {
        
        NSURL *fileURL = [[NSBundle mainBundle] URLForResource:@"turn" withExtension:@"wav"];
        NSData *fileData = [NSData dataWithContentsOfURL:fileURL];
        [formData appendPartWithFileData:fileData name:@"soundfile" fileName:@"turn.wav" mimeType:@"audio/wav"];
    }];
    __weak TUTViewController *weakSelf = self;
    AFHTTPRequestOperation *uploadOperation = [[AFHTTPRequestOperation alloc] initWithRequest:myRequest];
    [uploadOperation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        [weakSelf refresh];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"FAILURE TO UPLOAD: %@", error);
    }];
    
    NSOperationQueue *queue = [NSOperationQueue mainQueue];
    [queue addOperation:uploadOperation];
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.

    locationManager = [[CLLocationManager alloc] init];
    [locationManager startUpdatingLocation];
    
    stk::Stk::setSampleRate(SRATE);
    //! Toggle display of WARNING and STATUS messages.
    stk::Stk::showWarnings( true );
    //! Toggle display of error messages before throwing exceptions.
    stk::Stk::printErrors( true );

    // init the audio layer
    bool result = MoAudio::init(SRATE, FRAMESIZE, NUMCHANNELS);
    if (!result) {
        NSLog(@"cannot initialize real-time audio!");
        return;
    }
    
    // start the audio layer, registering a callback method
    result = MoAudio::start(audioCallback, NULL);
    if (!result) {
        // something went wrong
        NSLog(@"cannot start real-time audio!");
        return;
    }
        
    soundShareClient = [SoundShareClient sharedClient];

    self.soundTableView.delegate = self;
    self.soundTableView.dataSource = self;
    [self refresh];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
    } else {
        return YES;
    }
}

#pragma mark - Sound getting

- (void )refresh
{
//    __weak TUTViewController *weakSelf = self;
    [[SoundShareClient sharedClient] getPath:@"soundshare/sounds" parameters:nil success:^(__unused AFHTTPRequestOperation *operation, id JSON) {
        NSLog(@"GOT JSON: %@", JSON);
        
        NSMutableArray *mutableRecords = [NSMutableArray array];
        for (NSDictionary *sound in JSON) {
            [mutableRecords addObject:sound];
        }
//        weakSelf.sounds = mutableRecords;
//        [weakSelf.soundTableView reloadData];
    } failure:^(__unused AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"FAILURE, %@", error);
    }];
}


#pragma mark - UITableViewDataSource

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    int i = [indexPath indexAtPosition:1];  // The first index is the section, which will always be 0
    
    NSDictionary *soundJSON = [self.sounds objectAtIndex:i];
    NSDictionary *soundFields = [soundJSON objectForKey:@"fields"];
    NSString *soundPath = [soundFields objectForKey:@"path"];
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@soundshare/sounds/%@", kSoundShareBaseURLString, soundPath]];
    NSLog(@"URL: %@", url);
    [self playSoundAtURL:url];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [self.sounds count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *soundCellIdentifier = @"Sound";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:soundCellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:soundCellIdentifier];
    }
    
    int i = [indexPath indexAtPosition:1];  // The first index is the section, which will always be 0
    
    NSDictionary *soundJSON = [self.sounds objectAtIndex:i];
    NSDictionary *soundFields = [soundJSON objectForKey:@"fields"];
    cell.textLabel.text = [soundFields objectForKey:@"name"];
    cell.detailTextLabel.text = [soundFields objectForKey:@"description"];
    
    return cell;
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    return NO;
}

@end
