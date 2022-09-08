import React, { useEffect, useState } from "react";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import styled from "styled-components";
import { portfolioReducer } from "../../reducers/PortfolioContent";

import Pin from "./Pin";

const PinContainer = styled.div`
  width: 80vw;
  background-color: #ffffff;
  margin: 40px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-auto-rows: 10px;
  justify-content: center;
`;

const Homepage = () => {
  const [portfolioArr, setPortfolioArr] = useState<DocumentData[]>([]);
  const random = (numbers: number[]) => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };
  const numbers = [27, 36, 45, 48];

  useEffect(() => {
    onSnapshot(collection(db, "portfolios"), (doc) => {
      const postArr: DocumentData[] = [];
      doc.forEach((doc) => {
        // console.log(JSON.stringify(doc.data()));
        postArr.push(doc.data());
      });
      setPortfolioArr(postArr);
    });
  }, []);
  return (
    <PinContainer>
      {portfolioArr.map((data) => {
        return (
          <Pin key={data.portfolioID} size={random(numbers)} data={data} />
        );
      })}
    </PinContainer>
  );
};

export default Homepage;
