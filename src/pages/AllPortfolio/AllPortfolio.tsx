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
import QusetionMark, { introSteps } from "../../utilis/QusetionMark";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

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
  @media screen and (max-width: 900px) {
    width: 200px;
    right: auto;
    left: 200px;
  }
  @media screen and (max-width: 599px) {
    top: 80px;
    width: 95vw;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
`;

const SearchInput = styled.input`
  width: 240px;
  height: 40px;
  padding: 3px;
  border-radius: 10px;
  font-size: 20px;
  font-size: 14px;
  @media screen and (max-width: 900px) {
    width: 200px;
  }
  @media screen and (max-width: 599px) {
    width: 95vw;
  }
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
  const { userIsLogin, homepageList } = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );

  const firestoreSearching = async (key: string) => {
    const postArr: DocumentData[] = [];
    const searchCollection = collection(db, "portfolios");
    const q = query(searchCollection, where(key, "==", searchText.current));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      postArr.push(doc.data());
    });
    return postArr;
  };

  const searchData = async () => {
    const nameArr = await firestoreSearching("name");
    const titleArr = await firestoreSearching("title");
    setPortfolioArr([...nameArr, ...titleArr]);
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
      <SearchArea id="searchBtn">
        <SearchInput
          type="text"
          defaultValue={searchText.current}
          onChange={(e) => {
            searchText.current = e.target.value;
          }}
          placeholder="創作者姓名、作品集名稱"
        />
        <SearchBtn
          onClick={() => {
            searchData();
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchBtn>
      </SearchArea>
      <PinContainer id="portfoliosContainer">
        {portfolioArr.map((data, index) => {
          return (
            <Pin
              key={data.portfolioID}
              size={homepageList[index % 10]}
              data={data}
            />
          );
        })}
      </PinContainer>
      <QusetionMark
        stepType={
          userIsLogin ? introSteps.homepageLogin : introSteps.homepageLogout
        }
      />
    </Wrapper>
  );
};

export default Homepage;
