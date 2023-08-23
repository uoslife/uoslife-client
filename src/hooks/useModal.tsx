import {useState, useEffect, useMemo} from 'react';
// import Modal from '../components/overlay/Modal';
import styled from '@emotion/native';
import {Txt, colors, colorsType} from '@uoslife/design-system';
import {Image} from 'react-native';

type ModalBtn = {
  text: string;
  onPress?: () => void;
};

type ModalCommon = {
  title: string;
};

type ModalInner = {
  modalType: 'standard' | 'menu';
  description?: string;
  buttons: ModalBtn[];
  informationBox?: {key: string; value: string}[];
};

type Modal = ModalCommon & ModalInner;

const useModal = ({
  title,
  modalType,
  description,
  buttons,
  informationBox,
}: Modal) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalZIndex, setModalZIndex] = useState<number>(10);
  const [modalBgDark, setModalBgDark] = useState<boolean>(true);
  // parameter를 고차함수로 넘겨줘야 하니 주의하세요..
  const [modalBgOnpress, setModalBgOnpress] = useState<() => void>(() => {});

  const Modalcontent = () => {
    switch (modalType) {
      case 'standard':
        const buttonTxtColor: colorsType[] =
          buttons.length === 1
            ? ['grey130']
            : buttons.length === 2
            ? ['primaryBrand', 'grey90']
            : ['primaryBrand', 'grey130', 'grey90'];

        return (
          <>
            <S.standard.top>
              <Txt color={'grey190'} label={title} typograph="titleMedium" />
              {informationBox && (
                <S.standard.informationBox bgColor={colors.grey20}>
                  {informationBox.map((item, i) => (
                    <S.standard.informationItem key={i}>
                      <Txt
                        style={{width: 36}}
                        label={item.key}
                        color="primaryBrand" // 이상한데?
                        typograph="labelMedium"
                      />
                      <Txt
                        label={item.value}
                        color="grey190"
                        typograph="bodyMedium"
                      />
                    </S.standard.informationItem>
                  ))}
                </S.standard.informationBox>
              )}
              <Txt
                label={
                  description ||
                  'standard modal 이용시 description 필드를 채워주세요..'
                }
                color={'grey130'}
                typograph={'bodySmall'}
              />
            </S.standard.top>
            {buttons.map((btn, i) => (
              <S.standard.btn
                borderColor={colors.grey40}
                onPress={() => {
                  if (btn.onPress) btn.onPress();
                  setModalOpened(false);
                }}
                key={i}>
                <Txt
                  color={buttonTxtColor[i]}
                  label={btn.text}
                  typograph={'bodyMedium'}
                />
              </S.standard.btn>
            ))}
          </>
        );
      case 'menu':
        const RightArrowIcon = () => (
          <Image source={require('../assets/images/right_arrow.png')} />
        );

        return (
          <>
            <S.menu.top>
              <Txt color={'grey190'} label={title} typograph={'titleMedium'} />
              {description && (
                <Txt
                  label={description}
                  color={'grey130'}
                  typograph={'bodySmall'}
                />
              )}
            </S.menu.top>
            {buttons.map((btn, i) => (
              <S.menu.btn
                onPress={() => {
                  if (btn.onPress) btn.onPress();
                  setModalOpened(false);
                }}>
                <Txt
                  style={{paddingTop: 12, paddingBottom: 12, paddingLeft: 8}}
                  color={'grey190'}
                  label={btn.text}
                  typograph="bodyLarge"
                />
                <RightArrowIcon />
              </S.menu.btn>
            ))}
          </>
        );
    }
  };

  return {
    renderModal: modalOpened
      ? () => (
          <S.modalWrapper>
            <S.modalBg
              bgDark={modalBgDark}
              zIndex={modalZIndex}
              onPress={modalBgOnpress}
            />
            <S.modalContainer zIndex={modalZIndex}>
              <Modalcontent />
            </S.modalContainer>
          </S.modalWrapper>
        )
      : () => null,
    openModal: () => {
      setModalOpened(true);
    },
    closeModal: () => {
      setModalOpened(false);
    },
    activateBgDark: () => {
      setModalBgDark(true);
    },
    deactivateBgDark: () => {
      setModalBgDark(false);
    },
    setModalZIndex,
    setModalBgOnpress,
  };
};

type StyledBgProps = {
  zIndex: number;
  bgDark: boolean;
};

type Container = {
  zIndex: number;
};

const S = {
  modalWrapper: styled.View`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  modalBg: styled.Pressable<StyledBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
    z-index: ${({zIndex}) => zIndex};
  `,
  modalContainer: styled.View<Container>`
    width: 300px;

    background-color: white;
    border-radius: 20px;
  `,
  standard: {
    top: styled.View`
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;

      padding-top: 24px;
      padding-bottom: 16px;
      padding-left: 16px;
      padding-right: 16px;
    `,
    informationBox: styled.View<{bgColor: string}>`
      background-color: ${({bgColor}) => bgColor};
      width: 100%;

      display: flex;
      gap: 4px;

      padding-top: 12px;
      padding-bottom: 12px;
      padding-left: 16px;
      padding-right: 16px;
    `,
    informationItem: styled.View`
      display: flex;
      flex-direction: row;
      gap: 8px;
    `,
    btn: styled.Pressable<{borderColor: string}>`
      display: flex;

      justify-content: center;
      align-items: center;

      border-top-width: 1px;
      border-color: ${({borderColor}) => borderColor};

      padding-top: 10px;
      padding-bottom: 10px;
    `,
  },
  menu: {
    top: styled.View`
      padding-top: 20px;
      padding-bottom: 12px;
      padding-left: 16px;
      padding-right: 16px;

      display: flex;
      gap: 8px;
    `,
    btn: styled.Pressable`
      display: flex;
      flex-direction: row;

      padding-left: 16px;
      padding-right: 16px;

      justify-content: space-between;
      align-items: center;
    `,
  },

  menuModalContainer: styled.View``,
};

export default useModal;
