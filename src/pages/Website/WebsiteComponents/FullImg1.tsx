import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { CanvasLayout } from "../../../utilis/EditLatouts/EditLayout";

const FullImg1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const styles = {
    imageStyle: [],
    size: { height: 200, width: 900 },
    flexDirection: "row",
  };
  return (
    <CanvasLayout
      content={content}
      index={index}
      reducerType={"website"}
      styles={styles}
    />
  );
};

export default FullImg1;
