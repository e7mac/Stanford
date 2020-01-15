//
//  SoundShareClient.h
//  SoundShare
//
//  Created by Michael Rotondo on 2/21/12.
//  Copyright (c) 2012 Rototyping. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AFHTTPClient.h"

extern NSString * const kSoundShareBaseURLString;

@interface SoundShareClient : AFHTTPClient

+ (SoundShareClient *)sharedClient;
- (id)initWithBaseURL:(NSURL *)url;

@end
