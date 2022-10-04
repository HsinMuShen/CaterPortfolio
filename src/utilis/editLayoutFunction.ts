import { useDispatch } from "react-redux";

import { resumeComContent } from "../pages/Resume/Resume";
import { websiteComContent } from "../pages/Website/Website";
import { portfolioComContent } from "../pages/Portfolio/Portfolio";

export const setEditContentReducer = async (
  string: string,
  listIndex: number,
  content: resumeComContent | websiteComContent | portfolioComContent
) => {
  const tempArr = [...content.image];
  tempArr[listIndex] = string;
  return tempArr;
};
