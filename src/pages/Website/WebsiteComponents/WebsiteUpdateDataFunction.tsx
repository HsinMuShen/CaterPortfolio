import { useDispatch } from "react-redux";

import { websiteAddImage, websiteFillContent } from "../../../action";
import { websiteComContent } from "../Website";
import { setEditContentReducer } from "../../../utilis/editLayoutFunction";

function useUpdateResumeData({
  index,
  content,
}: {
  index: number;
  content: websiteComContent;
}) {
  const diapatch = useDispatch();

  const setReducerContent = async (
    type: string,
    string: string,
    listIndex: number
  ) => {
    const newArr = await setEditContentReducer(string, listIndex, content);
    diapatch(websiteFillContent(type, index, newArr));
  };

  return {
    setReducerContent: setReducerContent,
  };
}

export default useUpdateResumeData;
