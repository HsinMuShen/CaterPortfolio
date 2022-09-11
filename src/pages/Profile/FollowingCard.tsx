import React, { useState, useEffect } from "react";
import { followPortfolios } from "./FollowingArea";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SinglePin = styled.div`
  margin: 15px 10px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid;
  width: 240px;
  height: 280px;
  display: flex;
  flex-direction: column;
`;

const IntroArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
`;

const Intro = styled(Link)``;

const PinImage = styled(Link)<{ mainimage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
`;

const FollowingCard = ({
  data,
  index,
}: {
  data: followPortfolios;
  index: number;
}) => {
  const [isFollow, setIsFollow] = useState(false);

  return (
    <SinglePin>
      <PinImage
        to={`/portfolio/${data.portfolioID}`}
        mainimage={data.mainImage}
      />
      <IntroArea>
        <Intro to={`/portfolio/${data.portfolioID}`}>{data.name}</Intro>
        {/* <p>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p> */}
      </IntroArea>
    </SinglePin>
  );
};

export default FollowingCard;
