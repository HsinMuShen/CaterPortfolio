import React from "react";

import { resumeComContent } from "../Resume";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const Text1 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 750px)");
  const isRowBased1 = useMediaQuery("(min-width: 370px)");
  const styles = {
    imageStyle: [],
    textStyle: [
      {
        width: isRowBased0 ? "525px" : "70vw",
        margin: "5px",
      },
      {
        width: isRowBased1 ? "255px" : "70vw",
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

export default Text1;
