//
//  EmailComposer.m
//
//  Version 1.1
//
//  Created by Guido Sabatini in 2012.
//
//  Version 1.2
//
//  Modified by Jia Chang Jee in 2013.
//

#define RETURN_CODE_EMAIL_CANCELLED 0
#define RETURN_CODE_EMAIL_SAVED 1
#define RETURN_CODE_EMAIL_SENT 2
#define RETURN_CODE_EMAIL_FAILED 3
#define RETURN_CODE_EMAIL_NOTSENT 4

#import "EmailComposer.h"
#import "NSData+Base64.h"
#import <MobileCoreServices/MobileCoreServices.h>

@interface EmailComposer ()

-(void) showEmailComposerWithParameters:(NSDictionary*)parameters;
-(void) returnWithCode:(int)code;
-(NSString *) getMimeTypeFromFileExtension:(NSString *)extension;

@end

@implementation EmailComposer

// UNCOMMENT THIS METHOD if you want to use the plugin with versions of cordova < 2.2.0
//- (void) showEmailComposer:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
//    NSDictionary *parameters = [NSDictionary dictionaryWithObjectsAndKeys:
//                                [options valueForKey:@"toRecipients"], @"toRecipients",
//                                [options valueForKey:@"ccRecipients"], @"ccRecipients",
//                                [options valueForKey:@"bccRecipients"], @"bccRecipients",
//                                [options valueForKey:@"subject"], @"subject",
//                                [options valueForKey:@"body"], @"body",
//                                [options valueForKey:@"bIsHTML"], @"bIsHTML",
//                                [options valueForKey:@"attachments"], @"attachments",
//                                nil];
//    [self showEmailComposerWithParameters:parameters];
//}

// COMMENT THIS METHOD if you want to use the plugin with versions of cordova < 2.2.0
- (void) showEmailComposer:(CDVInvokedUrlCommand*)command {
    NSDictionary *parameters = [command.arguments objectAtIndex:0];
    [self showEmailComposerWithParameters:parameters];
}

-(void) showEmailComposerWithParameters:(NSDictionary*)parameters {

    MFMailComposeViewController *mailComposer = [[MFMailComposeViewController alloc] init];
    mailComposer.mailComposeDelegate = self;
    
	// set subject
    @try {
        NSString* subject = [parameters objectForKey:@"subject"];
        if (subject) {
            [mailComposer setSubject:subject];
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set subject; error: %@", exception);
    }

    // set body
    @try {
        NSString* body = [parameters objectForKey:@"body"];
        BOOL isHTML = [[parameters objectForKey:@"bIsHTML"] boolValue];
        if(body) {
            [mailComposer setMessageBody:body isHTML:isHTML];
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set body; error: %@", exception);
    }
	
	// Set recipients
    @try {
        NSArray* toRecipientsArray = [parameters objectForKey:@"toRecipients"];
        if(toRecipientsArray) {
            [mailComposer setToRecipients:toRecipientsArray];
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set TO recipients; error: %@", exception);
    }

    @try {
        NSArray* ccRecipientsArray = [parameters objectForKey:@"ccRecipients"];
        if(ccRecipientsArray) {
            [mailComposer setCcRecipients:ccRecipientsArray];
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set CC recipients; error: %@", exception);
    }

    @try {
        NSArray* bccRecipientsArray = [parameters objectForKey:@"bccRecipients"];
        if(bccRecipientsArray) {
            [mailComposer setBccRecipients:bccRecipientsArray];
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set BCC recipients; error: %@", exception);
    }

	@try {
        int counter = 1;
        NSArray *attachmentPaths = [parameters objectForKey:@"attachments"];
        if (attachmentPaths) {
            for (NSString* path in attachmentPaths) {
                @try {
                    NSRange range = [path rangeOfString:@"/" options:NSBackwardsSearch];
                    NSString *fileName = [path substringFromIndex:range.location + 1];
                    NSData *data = [[NSFileManager defaultManager] contentsAtPath:path];
                    //NSLog(@"HELLO %@", [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
//                    [mailComposer addAttachmentData:data mimeType:[self getMimeTypeFromFileExtension:[path pathExtension]] fileName:[NSString stringWithFormat:@"attachment%d.%@", counter, [path pathExtension]]];
                    [mailComposer addAttachmentData:data mimeType:[self getMimeTypeFromFileExtension:[path pathExtension]] fileName:fileName];
                    counter++;
                }
                @catch (NSException *exception) {
                    NSLog(@"Cannot attach file at path %@; error: %@", path, exception);
                }
            }
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set attachments; error: %@", exception);
    }
    
    @try {
        int counter = 1;
        NSArray *attachmentsData = [parameters objectForKey:@"attachmentsData"];
        if (attachmentsData) {
            for (NSArray *dataArr in attachmentsData) {
                NSString *fileName = [dataArr objectAtIndex:0];
                NSString *dataString = [dataArr objectAtIndex:1];
                NSData *data = [NSData dataFromBase64String:dataString];
                
                /*
                NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
                NSString *documentsDirectory = [paths objectAtIndex:0];
                NSString *fullName = [NSString stringWithFormat:@"%@/%@", documentsDirectory, fileName];
                
                [data writeToFile:fullName atomically:YES];
                */

                [mailComposer addAttachmentData:data mimeType:[self getMimeTypeFromFileExtension:[fileName pathExtension]] fileName:fileName];
                counter++;
            }
        }
    }
    @catch (NSException *exception) {
        NSLog(@"EmailComposer - Cannot set attachments data; error: %@", exception);
    }
    
    if (mailComposer != nil) {
        [self.viewController presentViewController:mailComposer animated:YES completion:nil];
    } else {
        [self returnWithCode:RETURN_CODE_EMAIL_NOTSENT];
    }
    //[mailComposer release];
}


// Dismisses the email composition interface when users tap Cancel or Send.
// Proceeds to update the message field with the result of the operation.
- (void)mailComposeController:(MFMailComposeViewController*)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError*)error {   
    // Notifies users about errors associated with the interface
	int webviewResult = 0;
    
    switch (result) {
        case MFMailComposeResultCancelled:
			webviewResult = RETURN_CODE_EMAIL_CANCELLED;
            break;
        case MFMailComposeResultSaved:
			webviewResult = RETURN_CODE_EMAIL_SAVED;
            break;
        case MFMailComposeResultSent:
			webviewResult =RETURN_CODE_EMAIL_SENT;
            break;
        case MFMailComposeResultFailed:
            webviewResult = RETURN_CODE_EMAIL_FAILED;
            break;
        default:
			webviewResult = RETURN_CODE_EMAIL_NOTSENT;
            break;
    }
	
    [controller dismissViewControllerAnimated:YES completion:nil];
    [self returnWithCode:webviewResult];
}

// Call the callback with the specified code
-(void) returnWithCode:(int)code {
    [self writeJavascript:[NSString stringWithFormat:@"window.plugins.emailComposer._didFinishWithResult(%d);", code]];
}

// Retrieve the mime type from the file extension
-(NSString *) getMimeTypeFromFileExtension:(NSString *)extension {
    if (!extension)
        return nil;
    CFStringRef pathExtension, type;
    // Get the UTI from the file's extension
    pathExtension = (__bridge_retained CFStringRef)extension;
    type = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, pathExtension, NULL);
    CFRelease(pathExtension);
    
    // Converting UTI to a mime type
    NSString *mimeType = (__bridge_transfer NSString *)UTTypeCopyPreferredTagWithClass(type, kUTTagClassMIMEType);
    if (type != NULL)
        CFRelease(type);
    
    return mimeType;
}

@end