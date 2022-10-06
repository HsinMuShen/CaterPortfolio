import React from "react";

import { resumeComContent } from "../Resume";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const TextAndImg0 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const isRowBased = useMediaQuery("(min-width: 700px)");
  const styles = {
    imageStyle: [
      {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        margin: isRowBased ? "20px 100px 20px 80px" : "0px auto 20px",
      },
    ],
    textStyle: [
      {
        width: isRowBased ? "510px" : "70vw",
        margin: "0 5px",
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

export default TextAndImg0;
