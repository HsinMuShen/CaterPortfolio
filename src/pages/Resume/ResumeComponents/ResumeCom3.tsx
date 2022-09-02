import React from "react";
import EditText from "../../../utilis/EditText";

const ResumeCom3 = ({ index }: { index: number }) => {
  return (
    <div>
      <EditText
        type={"resume"}
        text={"<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>"}
        index={index}
      />
    </div>
  );
};

export default ResumeCom3;
