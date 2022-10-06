import React from "react";

import { portfolioComContent } from "../Portfolio";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const MultiImg0 = ({
  content,
  index,
}: {
  content: portfolioComContent;
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

  return (
    <EditLayout
      content={content}
      index={index}
      reducerType={"portfolio"}
      styles={styles}
    />
  );
};

export default MultiImg0;
