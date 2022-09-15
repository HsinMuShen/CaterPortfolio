import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const upAnimation = keyframes`0% {
  transform: rotate(0deg);
  transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
}

10% {
  transform: rotate(-12deg);
  transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
}

20% {
  transform: rotate(12deg);
  transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
}

28% {
  transform: rotate(-10deg);
  transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
}

36% {
  transform: rotate(10deg);
  transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
}

42% {
  transform: rotate(-8deg);
  transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
}

48% {
  transform: rotate(8deg);
  transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
}

52% {
  transform: rotate(-4deg);
  transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
}

56% {
  transform: rotate(4deg);
  transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
}

60% {
  transform: rotate(0deg);
  transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
}

100% {
  transform: rotate(0deg);
  transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
}
`;

const TrashBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 6px;
  display: flex;
  font-size: 20px;
  cursor: pointer;
  transition: font-size 1s;
  &:hover {
    font-size: 24px;
    animation: ${upAnimation} 4s infinite linear;
  }
`;

const Delete = ({
  addDeleteCom,
  index,
}: {
  addDeleteCom: (index: number) => void;
  index: number;
}) => {
  const isPreview = useSelector((state: RootState) => state.IsPreviewReducer);

  return (
    <TrashBtn
      onClick={() => {
        addDeleteCom(index);
      }}
      style={{
        display: isPreview.resume && isPreview.website ? "none" : "block",
      }}
    >
      <FontAwesomeIcon icon={faTrash} />
    </TrashBtn>
  );
};

export default Delete;
