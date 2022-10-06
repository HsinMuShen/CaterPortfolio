import React from "react";

import { portfolioComContent } from "../Portfolio";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const Text0 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const isRowBased = useMediaQuery("(min-width: 1024px)");
  const styles = {
    imageStyle: [],
    textStyle: [
      {
        width: isRowBased ? "900px" : "85vw",
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
      reducerType={"portfolio"}
      styles={styles}
    />
  );
};

export default Text0;
