import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 400px;
  height: 200px;
  border: 2px solid;
  border-radius: 15px;
`;

const WarnningText = styled.p`
  margin: 60px 0 40px;
  font-size: 18px;
`;

const BtnArea = styled.div`
  display: flex;
`;

const SelectBtn = styled.div`
  border: 1px solid;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
  margin: 0 40px 20px;
`;

interface PopupProps {
  isPopup: boolean;
  text: string;
  sureToDelete: (isSure: boolean) => void;
}

const PopUp = ({ isPopup, text, sureToDelete }: PopupProps) => {
  return isPopup ? (
    <Wrapper>
      <PopFrame>
        <WarnningText>{text}</WarnningText>
        <BtnArea>
          <SelectBtn
            onClick={() => {
              sureToDelete(true);
            }}
          >
            確認
          </SelectBtn>
          <SelectBtn
            onClick={() => {
              sureToDelete(false);
            }}
          >
            取消
          </SelectBtn>
        </BtnArea>
      </PopFrame>
    </Wrapper>
  ) : (
    <></>
  );
};

export default PopUp;
