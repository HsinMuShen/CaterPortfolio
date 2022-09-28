import { useDispatch } from "react-redux";
import { websiteAddImage, websiteFillContent } from "../../../action";
import firebase from "../../../utilis/firebase";
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

  const setPreviewReducerImage = async (file: File, listIndex: number) => {
    const tempArr = [...content.image];
    const imageUrl = await firebase.getImageUrl(file);
    tempArr[listIndex] = imageUrl;
    diapatch(websiteAddImage(index, tempArr));
  };

  const setReducerText = async (text: string, listIndex: number) => {
    const tempArr = [...content.text];
    tempArr[listIndex] = text;
    diapatch(websiteFillContent(index, tempArr));
  };

  return {
    setReducerImage: setReducerImage,
    setPreviewReducerImage: setPreviewReducerImage,
    setReducerText: setReducerText,
  };
}

export default useUpdateResumeData;
