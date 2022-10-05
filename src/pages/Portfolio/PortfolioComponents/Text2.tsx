import React from "react";

import { portfolioComContent } from "../Portfolio";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const Text2 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 600px)");
  const isRowBased1 = useMediaQuery("(min-width: 340px)");
  const styles = {
    imageStyle: [],
    textStyle: [
      {
        width: isRowBased1 ? "300px" : "85vw",
        padding: " 0 10px",
        margin: "5px",
      },
      {
        width: isRowBased0 ? "525px" : "85vw",
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

export default Text2;
