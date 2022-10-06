import React, { useState } from "react";
import { followResumes } from "./FollowingArea";
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
  height: 50px;
  margin: 10px 0 0 10px;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
`;

const IntroImg = styled(Link)<{ $backgroundImg: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid;
  margin: 5px 10px 5px 0;
  background-image: url(${(props) => props.$backgroundImg});
  background-size: cover;
  background-position: center;
`;

const Intro = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #555555;
  font-weight: 600;
`;

const PinImage = styled(Link)<{ mainimage: string }>`
  flex: auto;
  background-image: url(${(props) => props.mainimage});
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0 0;
`;

const FollowingResumeCard = ({
  data,
  index,
}: {
  data: followResumes;
  index: number;
}) => {
  const [isFollow, setIsFollow] = useState(false);

  return (
    <SinglePin>
      <PinImage to={`/resume/${data.userID}`} mainimage={data.coverImage} />
      <IntroArea>
        <UserArea>
          <IntroImg
            to={`/profile/${data.userID}`}
            $backgroundImg={data.userImage}
          ></IntroImg>
          <Intro to={`/resume/${data.userID}`}>{data.name}</Intro>
        </UserArea>

        {/* <p>
          {isFollow ? `❤️` : `❤`}
          {data.followers.length}
        </p> */}
      </IntroArea>
    </SinglePin>
  );
};

export default FollowingResumeCard;
