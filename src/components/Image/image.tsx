import React, { useState, useEffect } from 'react';
import { IImage } from '../../types/AppContent';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const ImageComponent = (image: IImage, navigation?: any) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start();
  }, []);

  return (   
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity onPress={() => image.handleDelete?.(image.id ?? '')}>
            <Text style={{ fontSize: 12, color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        )}
      >
        {/* Check if name is not null or undefined before rendering the Image */}
        {image.name && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={() => image.onClickFunction?.(image.id ?? '')}>
              <Image style={styles.img} source={{ uri: image.name }} />       
            </TouchableOpacity>
          </Animated.View>
        )}
      </Swipeable>
    </GestureHandlerRootView>  
  );
};

const styles = StyleSheet.create({
  img: {   
    flex: 1,
    width: width / 3,
    height: height / 4,
  }
});

export default ImageComponent;