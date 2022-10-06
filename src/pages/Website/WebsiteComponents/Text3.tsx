import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const Text3 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 510px)");
  const styles = {
    imageStyle: [],
    textStyle: [
      {
        width: isRowBased ? "440px" : "85vw",
        padding: " 0 10px",
        margin: "5px",
      },
      {
        width: isRowBased ? "440px" : "85vw",
        padding: " 0 10px",
        margin: "5px",
      },
    ],
    flexDirection: "row",
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

export default Text3;
