import React from "react";

import { portfolioComContent } from "../Portfolio";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { CanvasLayout } from "../../../utilis/EditLatouts/EditLayout";

const FullImg0 = ({
  content,
  index,
}: {
  content: portfolioComContent;
  index: number;
}) => {
  const styles = {
    imageStyle: [],
    size: { height: 400, width: 900 },
    flexDirection: "row",
  };
  return (
    <CanvasLayout
      content={content}
      index={index}
      reducerType={"portfolio"}
      styles={styles}
    />
  );
};

export default FullImg0;
