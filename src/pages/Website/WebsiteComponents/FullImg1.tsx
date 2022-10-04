import React from "react";

import { websiteComContent } from "../Website";
import { useMediaQuery } from "../../../utilis/useMediaQuery";

import { CanvasLayout } from "../../../utilis/EditLayout";

const FullImg1 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  const isRowBased0 = useMediaQuery("(min-width: 1020px)");
  const isRowBased1 = useMediaQuery("(min-width: 925px)");
  const isRowBased2 = useMediaQuery("(min-width: 825px)");
  const isRowBased3 = useMediaQuery("(min-width: 725px)");
  const isRowBased4 = useMediaQuery("(min-width: 625px)");
  const isRowBased5 = useMediaQuery("(min-width: 525px)");
  const isRowBased6 = useMediaQuery("(min-width: 425px)");

  const styles = {
    imageStyle: [
      {
        scale: isRowBased0
          ? "1"
          : isRowBased1
          ? "0.9"
          : isRowBased2
          ? "0.8"
          : isRowBased3
          ? "0.7"
          : isRowBased4
          ? "0.6"
          : isRowBased5
          ? "0.5"
          : isRowBased6
          ? "0.4"
          : "0.33",
      },
    ],
    size: { height: 200, width: 900 },
    flexDirection: "row",
  };
  return <CanvasLayout content={content} index={index} styles={styles} />;
};

export default FullImg1;
