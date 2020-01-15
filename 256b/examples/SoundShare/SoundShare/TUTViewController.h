//
//  TUTViewController.h
//  SoundShare
//
//  Created by Michael Rotondo on 2/21/12.
//  Copyright (c) 2012 Rototyping. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TUTViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>

@property (strong, nonatomic) IBOutlet UITableView *soundTableView;
@property (strong, nonatomic) IBOutlet UITextField *nameTextField;
@property (strong, nonatomic) IBOutlet UITextField *descriptionTextField;
@property (strong, nonatomic) NSArray *sounds;

- (IBAction)uploadSound:(id)sender;

@end
