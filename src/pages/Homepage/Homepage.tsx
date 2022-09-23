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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import Pin from "./Pin";
import QusetionMark from "../../utilis/QusetionMark";
import firebase from "../../utilis/firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchArea = styled.div`
  position: fixed;
  top: 10px;
  right: 240px;
  display: flex;
  width: 240px;
  margin: 0 auto;
  justify-content: flex-start;
  z-index: 5;
`;

const SearchInput = styled.input`
  width: 240px;
  height: 40px;
  padding: 3px;
  border-radius: 10px;
  font-size: 20px;
`;

const SearchBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PinContainer = styled.div`
  width: 80vw;

  margin: 120px auto 0;
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
      <SearchArea>
        <SearchInput
          type="text"
          defaultValue={searchText.current}
          onChange={(e) => {
            searchText.current = e.target.value;
          }}
        />
        <SearchBtn
          onClick={() => {
            searchData();
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchBtn>
      </SearchArea>

      <PinContainer>
        {portfolioArr.map((data) => {
          return (
            <Pin key={data.portfolioID} size={random(numbers)} data={data} />
          );
        })}
      </PinContainer>
      <QusetionMark />
    </Wrapper>
  );
};

export default Homepage;
