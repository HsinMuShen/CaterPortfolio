import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonStyle = styled.div`
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
`;

export const EditPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 120px 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EditToggleButton = styled(ButtonStyle)`
  position: fixed;
  top: 180px;
  right: 25px;
  width: 80px;
  background-color: #ffffff;
  padding: 5px 8px;
  border: 1px solid;
  z-index: 4;
  @media screen and (max-width: 1279px) {
    font-size: 14px;
    width: 70px;
    padding: 3px 3px;
    right: 5px;
  }
`;

export const PreviewDiv = styled.div`
  position: absolute;
  height: 100%;
  z-index: 2;
`;

export const SingleComponentUnit = styled.div`
  display: flex;
  position: relative;
  margin: 10px 0;
  @media screen and (max-width: 1279px) {
    width: 90vw;
  }
`;

export const MoveBtn = styled.div`
  position: absolute;
  right: 4.5px;
  top: 25px;
  font-size: 20px;
`;

export const UploadButton = styled(ButtonStyle)`
  color: #555555;
  padding: 8px;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LinkButton = styled(Link)`
  margin: 40px 0 20px;
  text-decoration: none;
  color: #ffffff;
  background-color: #555555;
  border: 1px solid;
  padding: 8px;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #ffffff;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
`;
