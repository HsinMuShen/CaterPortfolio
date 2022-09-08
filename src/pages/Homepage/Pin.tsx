import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

const SinglePin = styled.div<{ size: number }>`
  margin: 15px 10px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid;
  grid-row-end: span ${(props) => props.size};
  display: flex;
  flex-direction: column;
`;

const IntroArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
`;

const Intro = styled(Link)``;

const PinImage = styled(Link)<{ mainImage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainImage});
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
`;

const Pin = ({ size, data }: { size: number; data: DocumentData }) => {
  return (
    <SinglePin size={size}>
      <PinImage
        to={`/portfolio/${data.portfolioID}`}
        mainImage={data.mainImage}
      />
      <IntroArea>
        <Intro to={`/profile/${data.userID}`}>{data.name}</Intro>
        <Intro to={`/portfolio/${data.portfolioID}`}>{data.title}</Intro>
        <p>❤{data.followers.length}</p>
      </IntroArea>
    </SinglePin>
  );
};

export default Pin;
