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

export const SinglePinStyle = styled.div`
  margin: 15px 10px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1.5px solid #555555;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 0px 10px #777777;
  }
`;

export const IntroAreaStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
`;

export const IntroImgStyle = styled(Link)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid;
  margin: 5px 10px 5px 0;
  background-size: cover;
  background-position: center;
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

export const IconArea = styled.div`
  display: flex;
  align-items: center;
`;

export const FollowText = styled.p`
  margin: 5px;
  font-size: 14px;
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

export const EditContentLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
  width: 960px;
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
