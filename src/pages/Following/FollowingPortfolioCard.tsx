import React, { useState } from "react";
import { followPortfolios } from "./FollowingArea";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SinglePin = styled.div`
  margin: 15px 20px 15px 0;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  width: 200px;
  height: 280px;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 0px 10px #777777;
  }
`;

const IntroArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  margin: 20px 0 0 10px;
`;

const Intro = styled(Link)<{ size: string; weight: string }>`
  font-size: ${(props) => props.size};
  text-decoration: none;
  color: #555555;
  font-weight: ${(props) => props.weight};
`;

const PinImage = styled(Link)<{ mainimage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
`;

const FollowingPortfolioCard = ({
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
        <Intro
          to={`/portfolio/${data.portfolioID}`}
          size={"20px"}
          weight={"600"}
        >
          {data.title}
        </Intro>
        <Intro to={`/profile/${data.portfolioID}`} size={"14px"} weight={"400"}>
          {data.name}
        </Intro>

        {/* <p>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p> */}
      </IntroArea>
    </SinglePin>
  );
};

export default FollowingPortfolioCard;
