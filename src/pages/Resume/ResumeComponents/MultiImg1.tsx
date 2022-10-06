import React from "react";

import { resumeComContent } from "../Resume";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const MultiImg0 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const isRowBased = useMediaQuery("(min-width: 375px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased ? "255px" : "70vw",
        height: "240px",
        margin: "0 5px",
      },
      {
        width: isRowBased ? "255px" : "70vw",
        height: "240px",
        margin: "0 5px",
      },
      {
        width: isRowBased ? "255px" : "70vw",
        height: "240px",
        margin: "0 5px",
      },
    ],
    textStyle: [],
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

export default MultiImg0;
