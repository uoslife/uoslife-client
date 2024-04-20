import {colors} from '@uoslife/design-system';
import {LibraryRankingContentType} from '../../api/services/util/library/libraryAPI.type';

export const calculateRankingChartHeight = (
  rank: LibraryRankingContentType['rank'],
) => {
  switch (rank) {
    case 1:
      return 130;
    case 2:
      return 80;
    case 3:
      return 54;
    default:
      return 0;
  }
};

export const calculateRankingChartBgColor = (
  rank: LibraryRankingContentType['rank'],
) => {
  switch (rank) {
    case 1:
      return colors.primaryLight;
    case 2:
      return colors.primaryLighter;
    case 3:
      return colors.primaryLighterAlt;
    default:
      return colors.primaryLight;
  }
};

export const changeHourFromMin = (min: number) => {
  return `${Math.floor(min / 60)}시간 ${min % 60}분`;
};
