import { useDispatch } from "react-redux";

import { resumeFillContent } from "../../action/ResumeReducerAction";
import { websiteFillContent } from "../../action/WebsiteReducerAction";
import { portfolioFillContent } from "../../action/PortfolioReducerAction";

import { resumeComContent } from "../../pages/Resume/Resume";
import { websiteComContent } from "../../pages/Website/Website";
import { portfolioComContent } from "../../pages/Portfolio/Portfolio";

export const setEditContentReducer = async (
  type: string,
  string: string,
  listIndex: number,
  content: resumeComContent | websiteComContent | portfolioComContent
) => {
  if (type === "text") {
    const tempArr = [...content.text];
    tempArr[listIndex] = string;
    return tempArr;
  } else if (type === "image") {
    const tempArr = [...content.image];
    tempArr[listIndex] = string;
    return tempArr;
  }
};

export function useUpdateData({
  reducerType,
  index,
  content,
}: {
  reducerType: string;
  index: number;
  content: resumeComContent | websiteComContent | portfolioComContent;
}) {
  const diapatch = useDispatch();

  const setReducerContent = async (
    type: string,
    string: string,
    listIndex: number
  ) => {
    console.log(content.text);
    const newArr = await setEditContentReducer(
      type,
      string,
      listIndex,
      content
    );
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
