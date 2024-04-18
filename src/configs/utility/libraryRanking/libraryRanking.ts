export type LibraryRankingMajorType = 'UOSLIFE' | 'LIFESCIENCE';
export type LibraryRankingMajorNameType = '시대생' | '생명과학과';
export type LibraryRankingMajorEnumType = Record<
  string,
  LibraryRankingMajorType
>;

export const LibraryRankingMajorName = ['시대생', '생명과학과'];

export const LibraryRankingMajorEnum: LibraryRankingMajorEnumType = {
  시대생: 'UOSLIFE',
  생명과학과: 'LIFESCIENCE',
};
