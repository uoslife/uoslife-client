export type UserStyleType = 'MORNING' | 'DAY' | 'NIGHT';
export type UsageRankingLevel = 0 | 1 | 2 | 3;

export type UsageRankingType = {
  standard: string;
  ranking: number;
  level: UsageRankingLevel;
};

export type RecapInfoType = {
  usageTime: {
    useTime: number;
    useHour: number;
    hourData: Array<number>;
  };
  preferRegion: {
    libraryName: string;
    roomName: string;
  };
  userStyle: UserStyleType;
  usageRanking: Array<UsageRankingType>;
};

export type GetLibraryHistoriesParams = {year: number};
export type GetLibraryHistoriesResponse = RecapInfoType;
export type SaveLibraryHistoriesParams = {year: number};
export type SaveLibraryHistoriesResponse = {};
