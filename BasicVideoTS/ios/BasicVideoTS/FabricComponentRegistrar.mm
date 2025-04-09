//
//  FabricComponentRegistrar.cpp
//  BasicVideoTS
//
//  Created by Jaideep Shah on 4/7/25.
//

#include "FabricComponentRegistrar.h"

#import <React/RCTComponentViewFactory.h>
#import <React/RCTViewComponentView.h>
#import "OTPublisherViewNativeComponentView.h"
#import "OTSubscriberViewNativeComponentView.h"

@implementation FabricComponentRegistrar

+ (void)registerCustomComponents {
    RCTComponentViewFactory *factory = [RCTComponentViewFactory currentComponentViewFactory];
    [factory registerComponentViewClass:[OTPublisherViewNativeComponentView class]];
    [factory registerComponentViewClass:[OTSubscriberViewNativeComponentView class]];
}

@end
