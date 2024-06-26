import {Icon, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {Linking} from 'react-native';
import {ArticleDetailType} from '../../types/announcement.type';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

const AnnouncementFileList = ({files}: Pick<ArticleDetailType, 'files'>) => {
  // 받아온 files를 객체를 배열로 변환(Server API Response 형식에 대응하기 위함)
  const processedFilesData = Object.entries(files).map(fileItem => ({
    name: fileItem[0],
    url: fileItem[1],
  }));

  const handlePressFileDownload = (downloadUrl: string) => () => {
    Linking.openURL(downloadUrl);
  };

  return (
    <S.List>
      {processedFilesData.map(({name, url}) => (
        <AnimatePress
          onPress={handlePressFileDownload(url)}
          variant="scale_down"
          key={name}>
          <S.Item>
            <Icon height={18} width={18} name="download" color="primaryBrand" />
            <Txt label={`${name}`} color="grey130" typograph="bodyMedium" />
          </S.Item>
        </AnimatePress>
      ))}
    </S.List>
  );
};

export default AnnouncementFileList;

const S = {
  List: styled.View`
    gap: 4px;
  `,
  Item: styled.View`
    display: flex;
    gap: 6px;
    flex-direction: row;
    align-items: center;

    border-radius: 10px;
    border: 1px ${colors.grey40};

    padding: 8px 16px;
  `,
};
