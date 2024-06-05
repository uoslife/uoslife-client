import {Txt, colors, Icon} from '@uoslife/design-system';
import styled from '@emotion/native';

type LikeCategoryButtonType = {
  isLike: boolean;
  setIsLike: (isLike: boolean) => void;
};
const LikeCategoryButton = ({isLike, setIsLike}: LikeCategoryButtonType) => {
  return (
    <S.LikeContainer onPress={() => setIsLike(!isLike)} isClick={isLike}>
      <Txt
        label="좋아요"
        color={isLike ? 'primaryBrand' : 'grey190'}
        typograph="titleSmall"
      />
      <Icon
        name="heart"
        height={18}
        width={18}
        color={isLike ? 'primaryBrand' : 'grey90'}
      />
    </S.LikeContainer>
  );
};

export default LikeCategoryButton;

type LikeContainerType = {
  isClick: boolean;
};
const S = {
  LikeContainer: styled.Pressable<LikeContainerType>`
    padding: 6px 8px 6px 10px;
    background-color: white;
    flex-direction: row;
    border-radius: 12px;
    align-self: center;
    justify-content: space-between;
    gap: 4px;
    align-items: center;
    ${props =>
      props.isClick
        ? `border : 1px solid ${colors.primaryLighterAlt};`
        : `border: 1px solid ${colors.grey40};`}
    ${props =>
      props.isClick
        ? `background-color : ${colors.primaryLighterAlt}`
        : ';background-color : white;'}
  `,
};
