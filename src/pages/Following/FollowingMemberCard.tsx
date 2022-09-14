import React, { useState } from "react";
import { followMembers } from "./FollowingArea";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SinglePin = styled.div`
  margin: 15px 20px 15px 0;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  width: 160px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    box-shadow: 0px 0px 10px #777777;
  }
`;

const IntroArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;
  align-items: center;
`;

const Intro = styled(Link)<{ size: string; weight: string; marginTop: string }>`
  font-size: ${(props) => props.size};
  text-decoration: none;
  color: #555555;
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.marginTop} 0;
`;

const PinImage = styled(Link)<{ mainimage: string }>`
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: center;
  border: 0.5px solid;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-top: 20px;
`;

const FollowingMemberCard = ({
  data,
  index,
}: {
  data: followMembers;
  index: number;
}) => {
  const [isFollow, setIsFollow] = useState(false);

  return (
    <SinglePin>
      <PinImage to={`/profile/${data.userID}`} mainimage={data.userImage} />
      <IntroArea>
        <Intro
          to={`/profile/${data.userID}`}
          size={"20px"}
          weight={"600"}
          marginTop={"8px"}
        >
          {data.name}
        </Intro>
        <Intro
          to={`/resume/${data.userID}`}
          size={"12px"}
          weight={"400"}
          marginTop={"3px"}
        >
          Resume
        </Intro>
        <Intro
          to={`/resume/${data.userID}`}
          size={"12px"}
          weight={"400"}
          marginTop={"3px"}
        >
          Website
        </Intro>
        {/* <p>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p> */}
      </IntroArea>
    </SinglePin>
  );
};

export default FollowingMemberCard;
