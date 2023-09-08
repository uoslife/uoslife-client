import {useState} from 'react';
import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type PhotoHookReturnType = [string, () => void];

const usePhoto = (initialValue: string): PhotoHookReturnType => {
  const [photoValue, setPhotoValue] = useState(initialValue);

  const imagePickerType = {
    launchImageLibrary: {
      text: '사진 보관함',
      onPress: async () => {
        try {
          const result = await launchImageLibrary({
            mediaType: 'photo',
          });
          if (result.didCancel) return null;
          setPhotoValue(result.assets![0].uri ?? '');
        } catch (e) {
          console.error(e);
        }
      },
    },
    launchCamera: {
      text: '사진 찍기',
      onPress: async () => {
        try {
          const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
          });
          if (result.didCancel) return null;
          setPhotoValue(result.assets![0].uri ?? '');
        } catch (e) {
          console.error(e);
        }
      },
    },
  };

  const selectPhoto = () => {
    Alert.alert('사진 변경', '', [
      {text: '취소', style: 'cancel'},
      imagePickerType.launchImageLibrary,
      imagePickerType.launchCamera,
    ]);
  };

  return [photoValue, selectPhoto];
};

export default usePhoto;
