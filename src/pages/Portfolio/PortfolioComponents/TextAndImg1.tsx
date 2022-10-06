import React from "react";

import { portfolioComContent } from "../Portfolio";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const TextAndImg1 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 520px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased ? "440px" : "85vw",
        height: "240px",
      },
    ],
    textStyle: [
      {
        width: isRowBased ? "440px" : "85vw",
        margin: "0 5px",
      },
    ],
    flexDirection: "row",
  };
  return (
    <EditLayout
      content={content}
      index={index}
      reducerType={"portfolio"}
      styles={styles}
    />
  );
};

export default TextAndImg1;
