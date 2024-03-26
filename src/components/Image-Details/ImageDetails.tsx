import React, { useEffect } from 'react'
import ImageComponent from '../Image/image'
import { RootStackParamList } from '../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

interface ImageDetailsProps {
    navigation?: StackNavigationProp<RootStackParamList, 'ImageDetails'>;
    route?: RouteProp<RootStackParamList, 'ImageDetails'>;

  }
  const ImageDetails:React.FC<ImageDetailsProps> =({ navigation, route })=> {
    const image = route?.params;  
  console.log(Number(image?.['latitude']));
  
  return (
    <View style={styles.container}>
    <Image style={styles.img} source={{ uri: image?.['name'] }} />
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: Number(image?.['latitude']),
          longitude: Number(image?.['longitude']),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(image?.['latitude']),
            longitude: Number(image?.['longitude']),
          }}
          title="Your Location"
          description="This is your location"
        />
      </MapView>
    </View>
  </View>
  
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor:'white',
    },
    img:{
        width:width,
        height:height/3,  
    },
    text: {
        fontSize: 18,
        marginTop: 10,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
  });
export default ImageDetails;
