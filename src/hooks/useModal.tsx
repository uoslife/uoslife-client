import {useState} from 'react';
import styled from '@emotion/native';
import {Icon, Txt, colors, colorsType} from '@uoslife/design-system';

type ModalBtn = {
  text: string;
  onPress?: () => void;
  closeAfterPressed?: boolean;
};

type UseModalParams = {
  title: string;
  // modalType이 "standard"건 "menu"건, 디자인상으로만 다르고 로직은 사실상 같은 관계로 button 주입은 동일하게 합니다.
  buttons: ModalBtn[];

  modalType: 'standard' | 'menu';
  description?: string;
  informationBox?: {key: string; value: string}[];
};

// 모달은 항상 바텀시트보다 위에 있습니다.
// 배경을 눌러도 사라지지 않습니다(기본값). setModalCloseOnBgPress를 통해 수정 가능합니다.
// 배경은 까맣게 처리됩니다(기본값). setModalBgDark를 통해 수정 가능합니다.
const useModal = ({
  title,
  modalType,
  description,
  buttons,
  informationBox,
}: UseModalParams) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalBgDark, setModalBgDark] = useState<boolean>(true);
  const [modalCloseOnBgPress, setModalCloseOnBgPress] =
    useState<boolean>(false);

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
                        color="primaryBrand" // Figma대로 색상 적용 안되는 문제
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
                  if (btn.closeAfterPressed) setModalOpened(false);
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
                  if (btn.closeAfterPressed) setModalOpened(false);
                }}>
                <Txt
                  style={{paddingTop: 12, paddingBottom: 12, paddingLeft: 8}}
                  color={'grey190'}
                  label={btn.text}
                  typograph="bodyLarge"
                />
                <Icon
                  name="forwardArrow"
                  color="grey130"
                  height={24}
                  width={24}
                />
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
              zIndex={10}
              onPress={() => {
                if (modalCloseOnBgPress) setModalOpened(false);
              }}
            />
            <S.modalContainer zIndex={10}>
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
    setModalCloseOnBgPress,
  };
};

type StyledBgProps = {
  zIndex: number;
  bgDark: boolean;
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
  modalContainer: styled.View<{
    zIndex: number;
  }>`
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

      padding: 24px 16px 16px;
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
