import {useState} from 'react';
import {Alert, AlertButton} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type PhotoHookReturnType = [string, () => void];

const usePhoto = (initialValue: string): PhotoHookReturnType => {
  const [photoValue, setPhotoValue] = useState(initialValue);

  const selectImageFromLibrary = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (!result.didCancel) setPhotoValue(result.assets![0].uri ?? '');
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
      if (!result.didCancel) setPhotoValue(result.assets![0].uri ?? '');
    } catch (e) {
      console.error(e);
    }
  };

  const selectPhotoOptions: AlertButton[] = [
    {text: '취소', style: 'cancel'},
    {text: '사진 보관함', onPress: selectImageFromLibrary},
    {text: '사진 찍기', onPress: takePhotoWithCamera},
  ];

  const selectPhoto = () =>
    Alert.alert('사진 변경', '', selectPhotoOptions, {cancelable: true});

  return [photoValue, selectPhoto];
};

export default usePhoto;
