import React, { useEffect, useState } from "react";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import styled from "styled-components";

import ResumeCard from "./ResumeCard";

const PinContainer = styled.div`
  width: 1040px;
  margin: 120px auto 0;
  display: flex;
  flex-wrap: wrap;

  justify-content: flex-start;
`;

const AllResumes = () => {
  const [portfolioArr, setPortfolioArr] = useState<DocumentData[]>([]);
  const random = (numbers: number[]) => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };
  const numbers = [27, 36, 45, 48];

  useEffect(() => {
    onSnapshot(collection(db, "resumes"), (doc) => {
      const postArr: DocumentData[] = [];
      doc.forEach((doc) => {
        postArr.push(doc.data());
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
