import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const TextAndImg2 = ({
  content,
  index,
}: {
  content: websiteComContent;
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
        margin: " 0 5px",
      },
    ],
    flexDirection: "row-reverse",
  };

  return (
    <EditLayout
      content={content}
      index={index}
      reducerType={"website"}
      styles={styles}
    />
  );
};

export default TextAndImg2;
