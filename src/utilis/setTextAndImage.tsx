import { useDispatch } from "react-redux";
import { portfolioAddImage, portfolioFillContent } from "../action";
const diapatch = useDispatch();

const setTestAndImage = {
  setReducerText(
    text: string,
    listIndex: number,
    textList: string[] | null[],
    index: number
  ) {
    const tempArr = textList;
    tempArr[listIndex] = text;
    // setTextList(tempArr);
    diapatch(portfolioFillContent(index, tempArr));
  },
};
