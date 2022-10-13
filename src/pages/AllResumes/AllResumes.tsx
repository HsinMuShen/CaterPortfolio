import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ResumeReducer } from "../../reducers";

import ResumeCard from "./ResumeCard";

const PinContainer = styled.div`
  width: 1050px;
  margin: 120px auto 0;
  display: flex;
  flex-wrap: wrap;

  justify-content: flex-start;
  @media screen and (max-width: 1079px) {
    width: 700px;
  }
  @media screen and (max-width: 800px) {
    width: 350px;
  }
`;

const AllResumes = () => {
  const [portfolioArr, setPortfolioArr] = useState<ResumeReducer[]>([]);
  const random = (numbers: number[]) => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };
  const numbers = [27, 36, 45, 48];

  useEffect(() => {
    const q = query(collection(db, "resumes"), where("isPublic", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postArr = [] as ResumeReducer[];
      querySnapshot.forEach((doc) => {
        postArr.push(doc.data() as ResumeReducer);
      });
      setPortfolioArr(postArr);
    });
  }, []);
  return (
    <PinContainer>
      {portfolioArr.map((data) => {
        return (
          <ResumeCard key={data.userID} size={random(numbers)} data={data} />
        );
      })}
    </PinContainer>
  );
};

export default AllResumes;
