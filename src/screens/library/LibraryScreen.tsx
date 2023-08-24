import styled from '@emotion/native';
import Header from '../../components/header/Header';

// Header 상단바에 겹침 이슈 해결 필요
const LibraryScreen = () => {
  return (
    <S.screenContainer>
      <Header label="도서관" />
    </S.screenContainer>
  );
};

export default LibraryScreen;

const S = {
  screenContainer: styled.ScrollView`
    height: 100%;
    width: 100%;
  `,
};
