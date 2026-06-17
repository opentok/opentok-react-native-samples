declare module 'opentok-react-native' {
  import type { ComponentType, ReactNode } from 'react';
  import type { StyleProp, ViewStyle } from 'react-native';

  export interface OTSessionProps {
    apiKey: string;
    sessionId: string;
    token: string;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    [key: string]: unknown;
  }

  export interface OTVideoProps {
    style?: StyleProp<ViewStyle>;
    [key: string]: unknown;
  }

  export const OTSession: ComponentType<OTSessionProps>;
  export const OTPublisher: ComponentType<OTVideoProps>;
  export const OTSubscriber: ComponentType<OTVideoProps>;
}
