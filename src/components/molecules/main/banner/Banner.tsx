import styled from '@emotion/native';
import {Image} from 'react-native';

const Banner = () => {
  return (
    <S.BannerWrapper>
      <Image
        source={require('../../../../assets/images/banner_sample_img.png')}
      />
    </S.BannerWrapper>
  );
};

export default Banner;

const S = {
  BannerWrapper: styled.TouchableOpacity`
    width: 100%;
    height: 148px;
    border-radius: 24px;
  `,
};
