import styled from '@emotion/native';
import {View} from 'react-native';
import {Txt, colors} from '@uoslife/design-system';
import {CafeteriaItemAttributesType} from '../../../../api/services/util/cafeteria/cafeteriaAPI.type';
import CafeteriaCardProps from './CafeteriaCard.type';

const CafeteriaCardBody = ({corner, menuList}: CafeteriaItemAttributesType) => {
  return (
    <S.CafeteriaCardBodyWrapper>
      {corner && <Txt label={corner} color="grey190" typograph="labelLarge" />}
      {menuList.map(item => (
        <View key={item.menu}>
          <S.InlineWrapper>
            <Txt label={item.menu} color="grey190" typograph="bodyLarge" />
            <Txt label={item.price} color="grey130" typograph="bodyLarge" />
          </S.InlineWrapper>
          <S.InlineWrapper>
            {item.sideDish && (
              <Txt
                label={item.sideDish}
                color="grey90"
                typograph="bodyMedium"
              />
            )}
            {item.sidePrice && (
              <Txt
                label={item.sidePrice}
                color="grey90"
                typograph="bodyMedium"
              />
            )}
          </S.InlineWrapper>
        </View>
      ))}
    </S.CafeteriaCardBodyWrapper>
  );
};

const CafeteriaCard = ({cafeteriaItem}: CafeteriaCardProps) => {
  return (
    <S.CafeteriaCardConatiner>
      <S.CafeteriaCardBodyContainer>
        {cafeteriaItem.map(item => (
          <CafeteriaCardBody
            key={item.menuList[0].menu}
            corner={item.corner}
            menuList={item.menuList}
          />
        ))}
      </S.CafeteriaCardBodyContainer>
    </S.CafeteriaCardConatiner>
  );
};

const S = {
  CafeteriaCardConatiner: styled.View`
    padding: 0 16px 12px;
  `,
  CafeteriaCardBodyContainer: styled.View`
    gap: 12px;
    flex-direction: column;
  `,
  InlineWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  CafeteriaCardBodyWrapper: styled.View`
    flex-direction: column;
    gap: 4px;
  `,
  divider: styled.View`
    height: 1px;
    background-color: ${colors.grey10};
    margin-top: 12px;
  `,
  emptyWrapper: styled.View`
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
  `,
};

export default CafeteriaCard;
