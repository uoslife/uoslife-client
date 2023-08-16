import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';

const BottomNavigation = () => {
  return (
    <S.BottomNavigationWrapper>
      <Txt label={'유틸리티'} color={'primaryDarker'} typograph={'caption'} />
      <Txt label={'학생증'} color={'primaryDarker'} typograph={'caption'} />
      <Txt label={'채팅'} color={'primaryDarker'} typograph={'caption'} />
    </S.BottomNavigationWrapper>
  );
};

export default BottomNavigation;

const S = {
  BottomNavigationWrapper: styled.View`
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    bottom: 12px;
    width: 300px;
    height: 60px;
    padding: 10px 40px;
    justify-content: space-between;
    align-items: center;
    border-radius: 60px;
    background: #fff;
    /* box-shadow: 0px 4px 16px 0px rgba(89, 89, 89, 0.26); */
  `,
};
