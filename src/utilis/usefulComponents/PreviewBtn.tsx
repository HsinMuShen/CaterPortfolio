import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";

import { EditToggleButton } from "../styledExtending";
import {
  isPreviewResume,
  isPreviewWebsite,
  isPreviewPortfolio,
} from "../../action/IsPreviewReducerAction";

const PreviewBtn = ({ isPreview, id }: { isPreview: boolean; id: string }) => {
  const dispatch = useDispatch();

  const togglePreviewState = () => {
    if (id === "resumePreviewBtn") {
      dispatch(isPreviewResume());
    } else if (id === "websitePreviewBtn") {
      dispatch(isPreviewWebsite());
    } else if (id === "portfolioPreviewBtn") {
      dispatch(isPreviewPortfolio());
    }
  };

  return (
    <EditToggleButton onClick={togglePreviewState} id={id}>
      {isPreview ? (
        <>
          <FontAwesomeIcon icon={faPen} />
          <span> 編輯</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faEye} />
          <span> 預覽</span>
        </>
      )}
    </EditToggleButton>
  );
};

export default PreviewBtn;
