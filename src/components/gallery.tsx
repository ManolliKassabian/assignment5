import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import axios from 'axios';
import ImageComponent from './Image/image';

const { width, height } = Dimensions.get('window');

const GalleryComponent: React.FC<any> = ({navigation}) => {
  const [images, setImages] = useState<{ id: string; uri: string }[]>([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    fetchImages();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    setImages([])
    fetchImages();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const goToImageDetails = (image:any) => {
    console.log(navigation);
    navigation?.navigate('ImageDetails', image);
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`https://65ffeeb5df565f1a61458296.mockapi.io/api/Images/Gallery/${id}`);
    fetchImages();
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get<{ id: string; uri: string }[]>('https://65ffeeb5df565f1a61458296.mockapi.io/api/Images/Gallery');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const renderPhotoItem = ({ item }: any) => {
    
    return (
      <ImageComponent
        id={item.id}
        name={item.name}
        handleDelete={() => handleDelete(item.id)}
        onClickFunction={()=> goToImageDetails(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={3}
        refreshControl={
        
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#009387']}
          />
          
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default GalleryComponent;