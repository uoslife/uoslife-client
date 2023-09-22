import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';

import CardLayout from '../cardLayout/CardLayout';

const CafeteriaBox = () => {
  return (
    <CardLayout style={{marginRight: 7}}>
      <S.BoxWrapper>
        <S.BoxTopArea>
          <Txt label={'학생식당'} color={'grey190'} typograph={'titleSmall'} />
          <S.BoxTimeIndicator>
            <Txt label={'~ 오후 2시'} color={'grey130'} typograph={'caption'} />
          </S.BoxTimeIndicator>
        </S.BoxTopArea>
        <S.BoxBottomArea>
          <S.BoxCafeteriaList>
            <S.BoxCafeteriaListLeftArea>
              <Txt
                label={'B코너'}
                color={'secondaryUi'}
                typograph={'labelLarge'}
              />
              <Txt
                label={'돈불고기'}
                color={'grey190'}
                typograph={'bodyMedium'}
              />
            </S.BoxCafeteriaListLeftArea>
            <Txt
              label={'3,000 원'}
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </S.BoxCafeteriaList>
          <S.BoxCafeteriaList>
            <S.BoxCafeteriaListLeftArea>
              <Txt
                label={'B코너'}
                color={'secondaryUi'}
                typograph={'labelLarge'}
              />
              <Txt
                label={'돈불고기'}
                color={'grey190'}
                typograph={'bodyMedium'}
              />
            </S.BoxCafeteriaListLeftArea>
            <Txt
              label={'3,000 원'}
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </S.BoxCafeteriaList>
          <S.BoxCafeteriaList>
            <S.BoxCafeteriaListLeftArea>
              <Txt
                label={'B코너'}
                color={'secondaryUi'}
                typograph={'labelLarge'}
              />
              <Txt
                label={'돈불고기'}
                color={'grey190'}
                typograph={'bodyMedium'}
              />
            </S.BoxCafeteriaListLeftArea>
            <Txt
              label={'3,000 원'}
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </S.BoxCafeteriaList>
        </S.BoxBottomArea>
      </S.BoxWrapper>
    </CardLayout>
  );
};

const CafeteriaContents = () => {
  return (
    <S.ContentsWrapper horizontal={true}>
      <CafeteriaBox />
      <CafeteriaBox />
    </S.ContentsWrapper>
  );
};

export default CafeteriaContents;

const S = {
  // CafeteriaContents
  ContentsWrapper: styled.ScrollView`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,
  // CafeteriaBox
  BoxWrapper: styled.Pressable`
    box-sizing: border-box;
    width: 280px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  BoxTopArea: styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  `,
  BoxTimeIndicator: styled.View`
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: 16px;
    background-color: ${colors.grey20};
  `,
  BoxBottomArea: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
  `,
  BoxCafeteriaList: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  BoxCafeteriaListLeftArea: styled.View`
    display: flex;
    flex-direction: row;
    gap: 12px;
  `,
};
