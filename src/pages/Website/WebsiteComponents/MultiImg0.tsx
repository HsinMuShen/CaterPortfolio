import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLayout";

const MultiImg0 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 500px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased ? "440px" : "85vw",
        height: "240px",
      },
      {
        width: isRowBased ? "440px" : "85vw",
        height: "240px",
      },
    ],
    textStyle: [],
    flexDirection: "row",
  };

  return <EditLayout content={content} index={index} styles={styles} />;
};

export default MultiImg0;
