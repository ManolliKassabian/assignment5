// navigationTypes.ts

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';

// Define the parameters (routes) available in your stack navigator
export type RootStackParamList = {
    ImageDetails: undefined;
   CameraScreen: undefined;
   GalleryScreen:undefined;
};

// Define the type for the navigation prop in your components
export type ImageDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImageDetails'
>;

export type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CameraScreen'
>;
export type GalleryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GalleryScreen'
>;

// Define the type for the route prop in your components
export type  ImageDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ImageDetails'
>;
export type  CameraScreenRouteProp = RouteProp<
  RootStackParamList,
  'CameraScreen'
>;
export type  GalleryScreenRouteProp = RouteProp<
RootStackParamList,
'GalleryScreen'
>;