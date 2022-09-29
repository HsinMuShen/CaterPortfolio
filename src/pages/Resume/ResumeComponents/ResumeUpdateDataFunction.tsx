import { useDispatch, useSelector } from "react-redux";
import { resumeAddImage, resumeFillContent } from "../../../action";
import { resumeComContent } from "../Resume";

function useUpdateResumeData({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) {
  const diapatch = useDispatch();

  const setReducerImage = async (
    JSONstringOrImageUrl: string,
    listIndex: number
  ) => {
    const tempArr = [...content.image];
    tempArr[listIndex] = JSONstringOrImageUrl;
    diapatch(resumeAddImage(index, tempArr));
  };

  const setReducerText = async (
    text: string,
    listIndex: number,
    index: number
  ) => {
    const tempArr = [...content.text];
    tempArr[listIndex] = text;
    diapatch(resumeFillContent(index, text, listIndex));
  };

  return {
    setReducerImage: setReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
