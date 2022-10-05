import { useDispatch } from "react-redux";

import {
  resumeFillContent,
  websiteFillContent,
  portfolioFillContent,
} from "../../action";
import { resumeComContent } from "../../pages/Resume/Resume";
import { websiteComContent } from "../../pages/Website/Website";
import { portfolioComContent } from "../../pages/Portfolio/Portfolio";

export const setEditContentReducer = async (
  string: string,
  listIndex: number,
  content: resumeComContent | websiteComContent | portfolioComContent
) => {
  const tempArr = [...content.image];
  tempArr[listIndex] = string;
  return tempArr;
};

export function useUpdateData({
  reducerType,
  index,
  content,
}: {
  reducerType: string;
  index: number;
  content: portfolioComContent;
}) {
  const diapatch = useDispatch();

  const setReducerContent = async (
    type: string,
    string: string,
    listIndex: number
  ) => {
    const newArr = await setEditContentReducer(string, listIndex, content);
    if (reducerType === "resume") {
      diapatch(resumeFillContent(type, index, newArr));
    } else if (reducerType === "website") {
      diapatch(websiteFillContent(type, index, newArr));
    } else if (reducerType === "portfolio") {
      diapatch(portfolioFillContent(type, index, newArr));
    }
  };

  return {
    setReducerContent: setReducerContent,
  };
}
