import React from "react";
import styled from "styled-components";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div<{ isAlert: boolean }>`
  position: fixed;
  top: 70px;
  right: ${(props) => (props.isAlert ? "20px" : "-320px")};
  width: 320px;
  height: 80px;
  border: 2px solid;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffffcc;
  padding: 10px 20px;
  z-index: 10;
  opacity: ${(props) => (props.isAlert ? "1" : "0")};
  transition: right 1s, opacity 1s;
`;

const AlertText = styled.p`
  font-size: 18px;
`;

const Alert = () => {
  const alertData = useSelector(
    (state: RootState) => state.IsPreviewReducer.alert
  );

  return (
    <Wrapper isAlert={alertData.isAlert}>
      <AlertText>
        {`${alertData.text}\xa0\xa0`}
        <FontAwesomeIcon icon={faFaceSmile} />
      </AlertText>
    </Wrapper>
  );
};

export default Alert;
