import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Dimensions, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the desired icon from react-native-vector-icons

const { width, height } = Dimensions.get('window');

const ImageDetails = ({ route }:any) => {
    const navigation = useNavigation();
    const image = route?.params;
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                slideAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }
            )
        ]).start();
    }, [fadeAnim, slideAnim]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text>
                <Icon name="arrow-back" size={24} color="black" /> {/* Use the icon component with desired name, size, and color */}
                </Text>
            </TouchableOpacity>
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                <Animated.View style={[styles.imageContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <Image style={styles.image} source={{ uri: image?.name }} />
                </Animated.View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: Number(image?.latitude),
                            longitude: Number(image?.longitude),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: Number(image?.latitude),
                                longitude: Number(image?.longitude),
                            }}
                            title="Your Location"
                            description="This is your location"
                        />
                    </MapView>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    imageContainer: {
        height: height / 3,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default ImageDetails;
