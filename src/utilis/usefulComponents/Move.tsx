import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const MoveBtn = styled.div`
  position: absolute;
  right: 4.5px;
  top: 60px;
  font-size: 20px;
`;

const Move = () => {
  const isPreview = useSelector((state: RootState) => state.IsPreviewReducer);
  return (
    <MoveBtn>
      {isPreview.resume && isPreview.website ? null : (
        <FontAwesomeIcon icon={faUpDownLeftRight} />
      )}
    </MoveBtn>
  );
};

export default Move;
