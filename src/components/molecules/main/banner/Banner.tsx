import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';

const Banner = () => {
  return (
    <S.BannerWrapper>
      <S.BannerOrderMarker>
        <Txt label={`1 / 5`} color={'white'} typograph={'labelSmall'} />
      </S.BannerOrderMarker>
      <S.BannerImage
        source={require('../../../../assets/images/banner_sample_img.png')}
      />
    </S.BannerWrapper>
  );
};

export default Banner;

const S = {
  BannerWrapper: styled.Pressable`
    position: relative;
  `,
  BannerImage: styled.Image`
    width: 100%;
    height: 148px;
    border-radius: 20px;
    object-fit: cover;
  `,
  BannerOrderMarker: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 11px;
    right: 12px;
    width: 35px;
    height: 24px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.2);
    z-index: 3;
  `,
};
