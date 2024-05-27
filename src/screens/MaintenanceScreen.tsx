import {useMemo} from 'react';
import {Image, View} from 'react-native';
import {useAtom} from 'jotai';
import styled, {css} from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import supabaseConfigAtom from '../store/app/supabaseConfig';

const MaintenanceScreen = () => {
  const [{data}] = useAtom(supabaseConfigAtom);

  const appBlockTitle = useMemo(
    () => data?.config?.get('app.block.title') as string,
    [data?.config],
  );
  const appBlockMessage = useMemo(
    () =>
      typeof data?.config?.get('app.block.message') === 'object'
        ? (data?.config?.get('app.block.message') as string[]).join('\n')
        : (data?.config?.get('app.block.message') as string),
    [data?.config],
  );
  return (
    <S.Container>
      <Image
        source={require('../assets/images/iroomae_babo.png')}
        style={{width: 232, height: 232, marginBottom: 16}}
      />
      {data?.hasNetworkError ? (
        <View
          style={css`
            gap: 8px;
            align-items: center;
          `}>
          <Txt
            label="서비스에 접속할 수 없습니다."
            color="grey190"
            typograph="titleLarge"
          />
          <View
            style={css`
              gap: 2px;
              align-items: center;
            `}>
            <Txt
              label="일시적인 네트워크 오류로 서비스에 접속할 수 없습니다."
              color="grey160"
              typograph="bodyMedium"
            />
            <Txt
              label="잠시 후 다시 시도해주세요."
              color="grey160"
              typograph="bodyMedium"
            />
          </View>
        </View>
      ) : (
        <View
          style={css`
            gap: 14px;
            align-items: center;
          `}>
          <Txt
            label={appBlockTitle}
            color="grey190"
            typograph="headlineMedium"
          />
          <Txt label={appBlockMessage} color="grey130" typograph="titleSmall" />
        </View>
      )}
    </S.Container>
  );
};

export default MaintenanceScreen;

const S = {
  Container: styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
};
