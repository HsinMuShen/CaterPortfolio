import React from "react";

import { resumeComContent } from "../Resume";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const TextAndImg1 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const isRowBased = useMediaQuery("(min-width: 560px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased ? "390px" : "70vw",
        height: "200px",
        margin: "5px",
      },
    ],
    textStyle: [
      {
        width: isRowBased ? "390px" : "70vw",
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

export default TextAndImg1;
