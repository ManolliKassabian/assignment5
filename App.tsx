// App.tsx
import CameraScreen from './src/components/cameraScreen';
import ImageDetails from './src/components/Image-Details/ImageDetails';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryComponent from './src/components/gallery';
import { StyleSheet, View } from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="ImageDetails" component={ImageDetails} />
        <Stack.Screen name="GalleryScreen" component={GalleryComponent} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;


// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: '100%',
//     height: '100%',
//     margin: 0,
//     padding: 0,
//     },
// });
