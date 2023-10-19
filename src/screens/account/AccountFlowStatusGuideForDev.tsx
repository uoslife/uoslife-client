import styled, {css} from '@emotion/native';
import {useSetAtom} from 'jotai';
import {
  accountFlowInitStatus,
  accountFlowStatusAtom,
} from '../../atoms/account';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {useState} from 'react';
import {Pressable, View} from 'react-native';

type locationType = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';

const transformLocation = (location: locationType) => {
  switch (location) {
    case 'TOP_LEFT':
      return css`
        top: 50px;
        left: 32px;
      `;
    case 'TOP_RIGHT':
      return css`
        top: 50px;
        right: 32px;
      `;
    case 'BOTTOM_LEFT':
      return css`
        bottom: 32px;
        left: 32px;
      `;
    case 'BOTTOM_RIGHT':
      return css`
        bottom: 32px;
        right: 32px;
      `;
  }
};

const ClearButton = ({
  setIsShown,
}: {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Pressable
      onPress={() => setIsShown(prev => !prev)}
      style={{
        alignItems: 'flex-end',
      }}>
      <Icon name={'clear'} width={24} height={24} />
    </Pressable>
  );
};

const AccountFlowStatusGuideForDev = () => {
  const setAccountFlowStatus = useSetAtom(accountFlowStatusAtom);

  const [location, setLocation] = useState<locationType>('TOP_RIGHT');
  const [isShown, setIsShown] = useState(true);

  return (
    <S.Container style={transformLocation(location)}>
      {isShown ? (
        <ClearButton setIsShown={setIsShown} />
      ) : (
        <>
          <ClearButton setIsShown={setIsShown} />
          <S.Button
            title="본인인증"
            onPress={() =>
              setAccountFlowStatus(() => {
                return {
                  ...accountFlowInitStatus,
                  baseStatus: 'ONPROGRESS',
                };
              })
            }
          />
          <S.Button
            title="닉네임 설정(신규)"
            onPress={() =>
              setAccountFlowStatus(() => {
                return {
                  ...accountFlowInitStatus,
                  baseStatus: 'ONPROGRESS',
                  stepStatus: {
                    userType: 'NEW',
                    step: 0,
                  },
                };
              })
            }
          />
          <S.Button
            title="계정 통합"
            onPress={() =>
              setAccountFlowStatus(() => {
                return {
                  ...accountFlowInitStatus,
                  baseStatus: 'ONPROGRESS',
                  stepStatus: {
                    userType: 'EXISTED',
                    step: 0,
                  },
                };
              })
            }
          />
          <S.Button
            title="닉네임 설정(기존)"
            onPress={() =>
              setAccountFlowStatus(() => {
                return {
                  ...accountFlowInitStatus,
                  baseStatus: 'ONPROGRESS',
                  stepStatus: {
                    userType: 'EXISTED',
                    step: 1,
                  },
                };
              })
            }
          />
          <S.Button
            title="포털인증"
            onPress={() =>
              setAccountFlowStatus(() => {
                return {
                  ...accountFlowInitStatus,
                  baseStatus: 'ONPROGRESS',
                  portalStatus: {
                    isPortalStep: true,
                    step: 0,
                  },
                };
              })
            }
          />
        </>
      )}
      <Pressable
        style={{position: 'absolute', top: 0, left: -14, padding: 4}}
        onPress={() => setLocation('TOP_LEFT')}>
        <Txt label={'<'} color={'grey90'} typograph={'caption'} />
      </Pressable>
      <Pressable
        style={{position: 'absolute', top: 0, right: -14, padding: 4}}
        onPress={() => setLocation('TOP_RIGHT')}>
        <Txt label={'>'} color={'grey90'} typograph={'caption'} />
      </Pressable>
      <Pressable
        style={{position: 'absolute', bottom: 0, left: -14, padding: 4}}
        onPress={() => setLocation('BOTTOM_LEFT')}>
        <Txt label={'<'} color={'grey90'} typograph={'caption'} />
      </Pressable>
      <Pressable
        style={{position: 'absolute', bottom: 0, right: -14, padding: 4}}
        onPress={() => setLocation('BOTTOM_RIGHT')}>
        <Txt label={'>'} color={'grey90'} typograph={'caption'} />
      </Pressable>
    </S.Container>
  );
};

export default AccountFlowStatusGuideForDev;

const S = {
  Container: styled.View`
    position: absolute;
    background-color: ${colors.grey40};
    border-radius: 14px;
    opacity: 0.6;
  `,
  Button: styled.Button`
    height: 12px;
  `,
};
