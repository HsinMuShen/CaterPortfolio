import React from "react";

import { resumeComContent } from "../Resume";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const FullImg1 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const isRowBased = useMediaQuery("(min-width: 1279px)");
  const styles = {
    imageStyle: [
      {
        width: isRowBased ? "790px" : "70vw",
        height: "200px",
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

export default FullImg1;
