import styled from '@emotion/native';
import {useAtom} from 'jotai';
import {Txt, colors} from '@uoslife/design-system';

import CardLayout from '../../../common/cardLayout/CardLayout';

import {CafeteriaItemType} from '../../../../../api/services/util/cafeteria/cafeteriaAPI.type';
import {mainScreenCafeteriaItemAtom} from '../../../../../store/cafeteria';

const CafeteriaBox = ({
  location,
  // operationTime,
  attributes,
}: CafeteriaItemType) => {
  return (
    <CardLayout style={{marginRight: 7}}>
      <S.BoxWrapper>
        <S.BoxTopArea>
          <Txt label={location} color="grey190" typograph="titleSmall" />
          {/* <S.BoxTimeIndicator>
            <Txt label={operationTime} color="grey130" typograph="caption" />
          </S.BoxTimeIndicator> */}
        </S.BoxTopArea>
        <S.BoxBottomArea>
          {attributes.map(item => (
            <S.BoxCafeteriaList key={item.menuList[0].menu}>
              <S.BoxCafeteriaListLeftArea>
                {item.corner && (
                  <Txt
                    label={item.corner}
                    color="secondaryUi"
                    typograph="labelLarge"
                    style={{width: 40}}
                  />
                )}
                <Txt
                  label={item.menuList[0].menu}
                  color="grey190"
                  typograph="bodyMedium"
                />
              </S.BoxCafeteriaListLeftArea>
              <Txt
                label={item.menuList[0].price}
                color="grey190"
                typograph="bodyMedium"
              />
            </S.BoxCafeteriaList>
          ))}
        </S.BoxBottomArea>
      </S.BoxWrapper>
    </CardLayout>
  );
};

const CafeteriaContents = () => {
  const [{items}] = useAtom(mainScreenCafeteriaItemAtom);
  return (
    <S.ContentsWrapper horizontal>
      {items ? (
        items.map(item => (
          <CafeteriaBox
            key={item.location}
            location={item.location}
            operationTime={item.operationTime}
            attributes={item.attributes}
          />
        ))
      ) : (
        <CardLayout style={{paddingHorizontal: 40, paddingVertical: 32}}>
          <Txt
            label="오늘은 운영하지 않아요."
            color="grey160"
            typograph="bodyLarge"
            style={{textAlign: 'center'}}
          />
        </CardLayout>
      )}
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
