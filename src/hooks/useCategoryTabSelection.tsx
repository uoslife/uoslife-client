import {categoryTabNumAtom} from '../atoms/announcement';
import {useAtom} from 'jotai';
import {
  articleCategoryAbbreviatedNameList,
  articleCategoryFullNameList,
} from '../constants/article-category-name';

/* 공지사항의 글 종류 state 관리를 위한 커스텀 훅 **/
const useCategoryTabSelection = () => {
  const [selectedCategoryTabNum, selectCategoryTabNum] =
    useAtom(categoryTabNumAtom);

  const selectedFullName = articleCategoryFullNameList[selectedCategoryTabNum];
  const selectedAbbreviatedName =
    articleCategoryAbbreviatedNameList[selectedCategoryTabNum];

  return {selectedFullName, selectedAbbreviatedName, selectCategoryTabNum};
};

export default useCategoryTabSelection;
