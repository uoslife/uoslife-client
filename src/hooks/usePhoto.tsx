import {useState} from 'react';
import {Alert, AlertButton} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type PhotoHookReturnType = [string, () => void];

const usePhoto = (initUri: string): PhotoHookReturnType => {
  const [selectedPhotoUri, setPhotoUri] = useState(initUri);

  const selectPhotoFromLibrary = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (!result.didCancel) setPhotoUri(result.assets![0].uri ?? '');
    } catch (e) {
      console.error(e);
    }
  };

  const takePhotoWithCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
      });
      if (!result.didCancel) setPhotoUri(result.assets![0].uri ?? '');
    } catch (e) {
      console.error(e);
    }
  };

  const selectPhotoOptions: AlertButton[] = [
    {text: '취소', style: 'cancel'},
    {text: '사진 보관함', onPress: selectPhotoFromLibrary},
    {text: '사진 찍기', onPress: takePhotoWithCamera},
  ];

  const openPhotoSelectionAlert = () =>
    Alert.alert('사진 변경', '', selectPhotoOptions, {cancelable: true});

  return [selectedPhotoUri, openPhotoSelectionAlert];
};

export default usePhoto;
