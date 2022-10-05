import React from "react";

import { portfolioComContent } from "../Portfolio";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const MultiImg3 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 350px)");
  const isRowBased1 = useMediaQuery("(min-width: 690px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased0 ? "350px" : "85vw",
        height: "240px",
      },
      {
        width: isRowBased1 ? "690px" : "85vw",
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

export default MultiImg3;
