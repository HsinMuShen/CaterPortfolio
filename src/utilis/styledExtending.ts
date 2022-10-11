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

export const Button = styled(ButtonStyle)`
  background-color: #ffffff;
  font-weight: 600;
`;
