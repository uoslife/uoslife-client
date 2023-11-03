import React from 'react';
import {Icon, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {ArticleDetailType} from '../../../../types/announcement.type';

const AnnouncementFileList = ({files}: Pick<ArticleDetailType, 'files'>) => {
  // 받아온 files를 객체를 배열로 변환
  const processedFilesData = Object.entries(files).map((fileItem, i) => ({
    name: fileItem[0],
    url: fileItem[1],
  }));

  return (
    <S.List>
      {processedFilesData.map(({name, url}, i) => (
        <S.Item key={i}>
          <Icon
            height={18}
            width={18}
            name="download"
            color="primaryBrand"
            key={i}
          />
          <Txt label={`${name}`} color="grey130" typograph="bodyMedium" />
        </S.Item>
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
