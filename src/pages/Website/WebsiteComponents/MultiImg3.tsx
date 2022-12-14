import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const MultiImg3 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 690px)");
  const isRowBased1 = useMediaQuery("(min-width: 350px)");

  const styles = {
    imageStyle: [
      {
        height: "240px",
        width: isRowBased0 ? "595px" : "85vw",
      },
      {
        height: "240px",
        width: isRowBased1 ? "290px" : "85vw",
      },
      ,
    ],
    textStyle: [],
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

export default MultiImg3;
