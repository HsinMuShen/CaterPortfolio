import { useDispatch } from "react-redux";
import { portfolioFillContent } from "../../../action";
import { portfolioComContent } from "../Portfolio";
import { setEditContentReducer } from "../../../utilis/editLayoutFunction";

function useUpdateResumeData({
  index,
  content,
}: {
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
    diapatch(portfolioFillContent(type, index, newArr));
  };

  return {
    setReducerContent: setReducerContent,
  };
}

export default useUpdateResumeData;
