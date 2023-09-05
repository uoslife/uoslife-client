import {Alert} from 'react-native';

const showErrorMessage = (error: unknown) => {
  console.error(error);
  Alert.alert('알 수 없는 오류', '이용에 불편을 드려 죄송합니다.');
};

export default showErrorMessage;
