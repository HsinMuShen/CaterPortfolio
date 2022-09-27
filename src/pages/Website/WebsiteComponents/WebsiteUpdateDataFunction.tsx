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
  const setReducerImage = async (JSONstring: string, listIndex: number) => {
    const tempArr = [...content.image];
    tempArr[listIndex] = JSONstring;
    diapatch(websiteAddImage(index, tempArr));
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...content.text];
    tempArr[listIndex] = text;
    diapatch(websiteFillContent(index, tempArr));
  };

  return {
    setReducerImage: setReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
