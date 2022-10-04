import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLayout";

const MultiImg1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 350px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased ? "290px" : "85vw",
        height: "240px",
      },
      {
        width: isRowBased ? "290px" : "85vw",
        height: "240px",
      },
      {
        width: isRowBased ? "290px" : "85vw",
        height: "240px",
      },
    ],
    textStyle: [],
    flexDirection: "row",
  };

  return <EditLayout content={content} index={index} styles={styles} />;
};

export default MultiImg1;
