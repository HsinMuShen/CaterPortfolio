import React from "react";
import EditText from "../../../utilis/EditText";
import { websiteComContent } from "../Website";

const WebsiteCom3 = ({
  content,
  index,
}: {
  content: websiteComContent;
  index: number;
}) => {
  return (
    <div style={{ display: "flex" }}>
      <EditText type={"website"} text={content.text} index={1} />
    </div>
  );
};

export default WebsiteCom3;
