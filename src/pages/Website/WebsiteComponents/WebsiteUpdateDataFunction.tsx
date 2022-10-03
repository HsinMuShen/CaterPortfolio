import { useDispatch } from "react-redux";
import { websiteAddImage, websiteFillContent } from "../../../action";
import { websiteComContent } from "../Website";

function useUpdateResumeData({
  index,
  content,
}: {
  index: number;
  content: websiteComContent;
}) {
  const diapatch = useDispatch();

  const setCanvasImage = async (
    JSONstringOrImageUrl: string,
    listIndex: number,
    index: number
  ) => {
    const tempArr = [...content.image];
    tempArr[listIndex] = JSONstringOrImageUrl;
    diapatch(websiteAddImage(index, tempArr));
  };

  const setReducerImage = async (
    JSONstringOrImageUrl: string,
    listIndex: number
  ) => {
    const tempArr = [...content.image];
    tempArr[listIndex] = JSONstringOrImageUrl;
    diapatch(websiteAddImage(index, tempArr));
  };

  const setReducerText = async (
    text: string,
    listIndex: number,
    index: number
  ) => {
    const tempArr = [...content.text];
    tempArr[listIndex] = text;
    diapatch(websiteFillContent(index, text, listIndex));
  };

  return {
    setCanvasImage: setCanvasImage,
    setReducerImage: setReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
