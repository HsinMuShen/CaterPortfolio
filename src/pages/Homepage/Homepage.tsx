import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import styled from "styled-components";

import Pin from "./Pin";
import Loading from "../../utilis/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PinContainer = styled.div`
  width: 80vw;

  margin: 40px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-auto-rows: 10px;
  justify-content: center;
`;

const Homepage = () => {
  const [portfolioArr, setPortfolioArr] = useState<DocumentData[]>([]);
  const searchText = useRef<string>("");
  // const [searchText, setSearchText] = useState<string>("");
  const random = (numbers: number[]) => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };
  const numbers = [27, 36, 45, 48];

  const searchData = async () => {
    const postArr: DocumentData[] = [];
    const searchCollection = collection(db, "portfolios");
    const qName = query(
      searchCollection,
      where("name", "==", searchText.current)
    );
    const qTitle = query(
      searchCollection,
      where("title", "==", searchText.current)
    );

    const querySnapshotName = await getDocs(qName);
    const querySnapshotTitle = await getDocs(qTitle);
    querySnapshotName.forEach((doc) => {
      postArr.push(doc.data());
      setPortfolioArr(postArr);
    });
    querySnapshotTitle.forEach((doc) => {
      postArr.push(doc.data());
      setPortfolioArr(postArr);
    });

    searchText.current = "";
  };
  useEffect(() => {
    onSnapshot(collection(db, "portfolios"), (doc) => {
      const postArr: DocumentData[] = [];
      doc.forEach((doc) => {
        postArr.push(doc.data());
      });
      setPortfolioArr(postArr);
    });
  }, []);
  return (
    <Wrapper>
      <input
        type="text"
        defaultValue={searchText.current}
        onChange={(e) => {
          searchText.current = e.target.value;
        }}
      />
      <button
        onClick={() => {
          searchData();
        }}
      >
        搜尋
      </button>
      <PinContainer>
        {portfolioArr.map((data) => {
          return (
            <Pin key={data.portfolioID} size={random(numbers)} data={data} />
          );
        })}
      </PinContainer>
    </Wrapper>
  );
};

export default Homepage;
