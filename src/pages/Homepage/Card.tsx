import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  text-decoration: none;

  border: 1px solid;
  padding: 3px 5px;
  margin: 60px 20px;
  color: #000000;
  &:hover {
    color: #ffffff;
    background-color: #000000;
  }
`;

const SingleCard = styled.p`
  font-weight: 550;
`;

// type CardProps = {
//   card:portfolio,
// }

const Card: React.FC = () => {
  return (
    // <Wrapper to={`/portfolio/${card.id}`}>
    //   <SingleCard>{card.title}</SingleCard>
    // </Wrapper>
    <></>
  );
};

export default Card;
