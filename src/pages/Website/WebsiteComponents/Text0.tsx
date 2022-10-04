import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLayout";

const Text0 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 1024px)");
  const styles = {
    imageStyle: [],
    textStyle: [
      {
        width: isRowBased ? "890px" : "85vw",
        padding: " 0 10px",
        margin: "5px",
      },
    ],
    flexDirection: "row",
  };

  return <EditLayout content={content} index={index} styles={styles} />;
};

export default Text0;
