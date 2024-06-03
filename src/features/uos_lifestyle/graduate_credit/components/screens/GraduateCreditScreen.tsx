import {ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
import BusinessLogic from '../../services/creditService';

// 더미데이터
import dummyData from '../../configs/dummydata';

const data = new BusinessLogic(dummyData);

// 현재, 필요 학점 더해준다.

const GraduateCreditScreen = () => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  return (
    <ScrollView bounces={false}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="이수 학점 확인하기"
        onPressBackButton={() => navigation.goBack()}
      />
      <S.GraduateCreditScreen>
        <SubjectDetailButton type="major" label="디자인학과" />
        <SubjectDetailButton type="subject" label="전공 필수" />
        <ProgressBar
          type="sub"
          maxNum={130}
          currentCredit={70}
          minGraduateCredit={80}
        />
        <S.TagsContainer>
          {data.tags().map((tag, index) => (
            <S.SubjectTag key={index}>
              {/* total이 0이면 부전공이나 복수전공 여부 X */}
              {tag.total !== 0 ? (
                <S.TagWrapper>
                  <S.TagHeader>
                    <Txt
                      label={tag.label}
                      color="black"
                      typograph="titleSmall"
                    />
                    <Pressable
                    // TODO: label 이용해 navigate 작성
                    // onPress={() => navigation(label)}
                    >
                      <Icon
                        name="forwardArrow"
                        color="grey90"
                        width={20}
                        height={20}
                      />
                    </Pressable>
                  </S.TagHeader>
                  <S.TagFooter>
                    <S.CreditInfo>
                      <Txt
                        label={`${tag.current}`}
                        color="grey130"
                        typograph="bodyMedium"
                      />
                      <Txt
                        label={`/${tag.total}`}
                        color="grey60"
                        typograph="bodyMedium"
                      />
                    </S.CreditInfo>
                    <S.StatusButtonWrapper status={tag.status}>
                      <S.StatusButton status={tag.status}>
                        {tag.status ? '이수 완료' : '미이수'}
                      </S.StatusButton>
                    </S.StatusButtonWrapper>
                  </S.TagFooter>
                </S.TagWrapper>
              ) : (
                // 복수전공, 부전공 여부에 따라 비활성화
                <S.TagWrapper>
                  <S.TagHeader>
                    <Txt
                      label={tag.label}
                      color="grey40"
                      typograph="bodyLarge"
                    />
                    <Icon
                      name="forwardArrow"
                      color="grey40"
                      width={20}
                      height={20}
                    />
                  </S.TagHeader>
                </S.TagWrapper>
              )}
            </S.SubjectTag>
          ))}
        </S.TagsContainer>
      </S.GraduateCreditScreen>
    </ScrollView>
  );
};

export default GraduateCreditScreen;

const S = {
  GraduateCreditScreen: styled.View`
    gap: 24px;
    padding: 52px 16px 120px 16px;
    flex: 1;
  `,
  TagsContainer: styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  `,
  SubjectTag: styled.View`
    width: 160px;
    height: 100px;
    padding: 12px 8px 12px 12px;
    gap: 10px;
    align-items: center;
    border-radius: 8px;
    background-color: ${colors.grey10};
  `,
  TagWrapper: styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    background-color: ${colors.grey10};
    width: 100%;
    height: 100%;
  `,
  TagHeader: styled.View`
    display: flex;
    width: 100%;
    height: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  TagFooter: styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  CreditInfo: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  StatusButtonWrapper: styled.View<{status: boolean}>`
    display: flex;
    height: 100%;
    width: ${({status}) => (status ? '57px' : '44px')};
    height: auto;
    margin: 0;
    border-radius: 10px;
    border-color: ${({status}) =>
      status ? colors.primaryBrand : colors.grey60};
    border: 1px solid;
    text-align: center;
    align-items: center;
  `,
  StatusButton: styled.Text<{status: boolean}>`
    color: ${({status}) => (status ? colors.primaryBrand : colors.grey60)};
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
  `,
};
