import React from "react";

import { resumeComContent } from "../Resume";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const Text2 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const isRowBased = useMediaQuery("(min-width: 370px)");
  const styles = {
    imageStyle: [],
    textStyle: [
      {
        width: isRowBased ? "255px" : "70vw",
        margin: "5px",
      },
      {
        width: isRowBased ? "255px" : "70vw",
        margin: "5px",
      },
      {
        width: isRowBased ? "255px" : "70vw",
        margin: "5px",
      },
    ],
    flexDirection: "row",
  };
  return (
    <EditLayout
      content={content}
      index={index}
      reducerType={"resume"}
      styles={styles}
    />
  );
};

export default Text2;
