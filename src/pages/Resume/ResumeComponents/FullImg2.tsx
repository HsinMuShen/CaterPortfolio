import React from "react";

import { resumeComContent } from "../Resume";

import { EditLayout } from "../../../utilis/EditLatouts/EditLayout";

const FullImg2 = ({
  index,
  content,
}: {
  index: number;
  content: resumeComContent;
}) => {
  const styles = {
    imageStyle: [
      {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        margin: "0 auto",
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

export default FullImg2;
