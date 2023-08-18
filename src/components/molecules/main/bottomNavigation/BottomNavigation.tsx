import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';

const BottomNavigation = () => {
  return (
    <S.BottomNavigationWrapper>
      <S.NavigationButton>
        <Icon name={'menu_primaryBrand'} width={24} height={24} />
        <Txt label={'시대생활'} color={'primaryBrand'} typograph={'caption'} />
      </S.NavigationButton>
      <S.NavigationButton>
        <Icon name={'studentId_grey190'} width={24} height={24} />
        <Txt label={'학생증'} color={'grey160'} typograph={'caption'} />
      </S.NavigationButton>
      <S.NavigationButton>
        <Icon name={'person_grey190'} width={24} height={24} />
        <Txt label={'채팅'} color={'grey160'} typograph={'caption'} />
      </S.NavigationButton>
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
    gap: 16px;
    align-items: center;
    justify-content: center;
    border-radius: 60px;
    background: #fff;
    /* box-shadow: 0px 4px 16px 0px rgba(89, 89, 89, 0.26); */
  `,
  NavigationButton: styled.Pressable`
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  `,
};
