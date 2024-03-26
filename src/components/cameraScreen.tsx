import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useEffect, useRef, useState } from "react";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import GalleryComponent from "./gallery";
import { Alert, Linking, View, Text, SafeAreaView, Image, Pressable, Button, StyleSheet, Dimensions, PermissionsAndroid, Platform } from "react-native";
import axios from "axios";
import Geolocation from '@react-native-community/geolocation';
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
interface CameraProps {
  navigation?: StackNavigationProp<RootStackParamList, 'CameraScreen'>;
  route?: RouteProp<RootStackParamList, 'CameraScreen'>;
}
const CameraScreen :React.FC<CameraProps> =({ navigation, route }) => {
  
    const { requestPermission, hasPermission } = useCameraPermission();
    const camera = useRef<Camera>(null);
   
    const [isCameraVisible, setIsCameraVisible] = useState(false);
      const [isGallery, setIsGallery] = useState(false);

    const [capturedImage, setCapturedImage] = useState<null | string>(null);
    const [
        currentLongitude,
        setCurrentLongitude
      ] = useState('');
      const [
        currentLatitude,
        setCurrentLatitude
      ] = useState('');
      const [
        locationStatus,
        setLocationStatus,
      ] = useState('');
    const openCamera = () => setIsCameraVisible(true);
    const closeCamera = () => setIsCameraVisible(false);
    const device = useCameraDevice("back");
    useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                getOneTimeLocation();
                subscribeLocationLocation();
              } else {
                setLocationStatus('Permission Denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }
        };
        requestLocationPermission();
     
      }, []);
    const handleCameraPermission = async () => {
      const isAccessGranted = await requestPermission();
  
      if (!isAccessGranted) {
        Alert.alert("Permission required", "Open settings to grant permission", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open settings",
            style: "default",
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ]);
        return;
      }
      // open camera logic
      openCamera();
    };
  
    const takePhoto = async () => {
      const photo = await camera.current?.takePhoto();
      setCapturedImage(`file://${photo!.path}`);
      closeCamera();
    };
  
    const backToCamera = async () => {
      setIsGallery(false);
      setCapturedImage(null);
    }
  
      const addImage = async (name: string,latitude:string,longitude:string) => {

        try {
          const response = await axios.post('https://65ffeeb5df565f1a61458296.mockapi.io/api/Images/Gallery', { name:name , latitude:latitude,longitude:longitude });
        } catch (error) {
        }
      };
  
    const saveImage = async () => {
        
      try {
        if (!capturedImage) {
          throw new Error('Captured image is null or undefined');
        }

        await CameraRoll?.saveAsset(capturedImage, { type: 'photo' });

        Alert.alert('Success', `Image saved to gallery successfully.`, [
          { style: 'cancel', text: 'Cancel' },
          {
            text: 'Open Photos',
            onPress: async () => {
     
              addImage(capturedImage,currentLatitude,currentLongitude);
              setIsGallery(true);
  
          },
          },
        ]);
      } catch (error) {
      }
    };
  
    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position:any) => {
            setLocationStatus('You are Here');
                const currentLongitude = 
              JSON.stringify(position.coords.longitude);
                const currentLatitude = 
              JSON.stringify(position.coords.latitude);
                setCurrentLongitude(currentLongitude);
                        setCurrentLatitude(currentLatitude);
          },
          (error:any) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
      };
    
      const subscribeLocationLocation = () => {
        const watchID = Geolocation.watchPosition(
          (position:any) => {
            setLocationStatus('You are Here');
                const currentLongitude =
              JSON.stringify(position.coords.longitude);
                const currentLatitude = 
              JSON.stringify(position.coords.latitude);
                setCurrentLongitude(currentLongitude);
            setCurrentLatitude(currentLatitude);
          },
          (error:any) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };
    if (device === null) {
      return (
        <View >
          <Text style={{ fontSize: 20, color: "red" }}>
            Camera feature not supported
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
      {!isGallery && (
        <SafeAreaView>
          {!!capturedImage ? (
            <>
              <View
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: capturedImage }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>

              <Pressable
                onPress={() => {
                  setCapturedImage(null);
                }}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: pressed ? "#001833" : "#007aff",
                    transform: [{ scale: pressed ? 1.2 : 1 }],
                  },
                ]}
              >
                <Text style={{ fontSize: 20, color: "#fff" }}>Clear image</Text>
              </Pressable>

              <Pressable onPress={saveImage} style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: pressed ? "#001833" : "#007aff",
                  transform: [{ scale: pressed ? 1.2 : 1 }],
                },
              ]}>
                <Text style={{ fontSize: 20, color: "#fff" }}>Save to camera roll</Text>
              </Pressable>
            </>
          ) : (
              !isCameraVisible && (
                <Pressable
                  onPress={handleCameraPermission}
                  style={({ pressed }) => [
                    styles.button,
                    {
                      backgroundColor: pressed ? "#001833" : "#007aff",
                      transform: [{ scale: pressed ? 1.2 : 1 }],
                    },
                  ]}
                >
                  <Text style={{ fontSize: 20, color: "#fff" }}>
                    {hasPermission ? "Open camera" : "Request camera access"}
                  </Text>
                </Pressable>
              )
            )}
        </SafeAreaView>
      )}
      {isCameraVisible && (
        <View style={{ flex: 1 }}>
          {/* Camera Component */}
          <Camera
            photo
            ref={camera}
            style={{ width: width, height: height }}
            device={device!}
            isActive={true}
          />

          {/* Take Photo Button */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={takePhoto} style={styles.button}>
              <Text style={{ fontSize: 20, color: "#fff" }}>Take photo</Text>
            </Pressable>
          </View>
        </View>
      )}
      {isGallery && <GalleryComponent navigation={navigation} />}

      {/* "Go Back to Camera" Button */}
      {isGallery && (
        <View style={styles.backButton}>
          <Button
            title="Go Back to Camera"
            color="blue"
            onPress={backToCamera}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007aff',
    borderRadius: 8,
    marginTop: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
});

export default CameraScreen;