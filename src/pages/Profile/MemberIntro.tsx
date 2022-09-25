import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { isPreviewProfile, initialSetUserData, setAlert } from "../../action";
import { UserReducer } from "../../reducers";
import { Link } from "react-router-dom";

import firebase from "../../utilis/firebase";
import FollowBtn from "./FollowBtn";
import ChatButton from "./ChatButton";
import { portfolioReducer } from "../../reducers/PortfolioContent";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Wrapper = styled.div``;

const ImageContainer = styled.div`
  display: flex;
  width: 900px;
  margin: 10px auto 0;
  align-items: center;
`;

const ImagePreview = styled.div<{
  previewUrl: string;
  width: string;
  height: string;
  borderRadius: string;
  borderWidth: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: solid ${(props) => props.borderWidth} black;
  border-radius: ${(props) => props.borderRadius};
  background-position: center;
  background-image: url(${(props) => props.previewUrl});
  background-size: cover;
  background-color: #ffffff;
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;
const ImageInput = styled.input`
  display: none;
`;

const MainImageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 120px 0 100px;
`;

const IntroInput = styled.textarea`
  width: 420px;
  height: 80px;
`;

const IntroTextArea = styled.div`
  width: 420px;
  font-size: 14px;
  margin-right: 40px;
`;

const NameTag = styled.p`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
  align-items: center;
`;
const EditBtn = styled(Link)`
  background-color: #ffffff;
  color: #555555;
  border: 2px solid;
  width: 120px;
  height: 30px;
  font-size: 14px;
  margin: 5px 0 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const MemberIntro = ({ profileData, setProfileData }: UserReducer) => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isPreviewContent = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );
  const dispatch = useDispatch();

  const renewImageUrl = async (type: string, file: File) => {
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(initialSetUserData(type, imageUrl));
  };

  const reNewPortfolioCollection = async () => {
    const userPortfolio = await firebase.searchUserPortfolio(userData.userID);
    let portfolioPromiswArr: any[] = [];
    userPortfolio.forEach((portfolioData) => {
      portfolioPromiswArr.push(
        updateDoc(doc(db, `portfolios`, `${portfolioData.portfolioID}`), {
          userImage: userData.userImage,
        })
      );
    });
    await Promise.all(portfolioPromiswArr);
  };

  return (
    <Wrapper>
      <ImagePreview
        previewUrl={profileData.backgroundImage}
        width={"960px"}
        height={"240px"}
        borderRadius={"0"}
        borderWidth={"0"}
      >
        <ImageLabel>
          {isPreviewContent.profileIntro ? "" : "+"}
          <ImageInput
            type="file"
            id="postImage"
            disabled={isPreviewContent.profileIntro}
            onChange={(e) => {
              renewImageUrl("backgroundImage", e.target.files![0]);
            }}
          />
        </ImageLabel>
      </ImagePreview>
      <ImageContainer>
        <MainImageArea>
          <ImagePreview
            previewUrl={profileData.userImage}
            width={"100px"}
            height={"100px"}
            borderRadius={"90px"}
            borderWidth={"1px"}
          >
            <ImageLabel>
              {isPreviewContent.profileIntro ? "" : "+"}
              <ImageInput
                type="file"
                id="postImage"
                disabled={isPreviewContent.profileIntro}
                onChange={(e) => {
                  renewImageUrl("userImage", e.target.files![0]);
                }}
              />
            </ImageLabel>
          </ImagePreview>
          <NameTag>{profileData.name}</NameTag>
        </MainImageArea>

        {isPreviewContent.profileIntro ? (
          <IntroTextArea>{profileData.introduction}</IntroTextArea>
        ) : (
          <IntroInput
            defaultValue={profileData.introduction}
            onChange={(e) => {
              dispatch(initialSetUserData("introduction", e.target.value));
              setProfileData({ ...profileData, introduction: e.target.value });
            }}
          />
        )}
        <EditArea>
          {profileData.userID === userData.userID ? (
            <EditBtn
              to={"#"}
              onClick={async () => {
                dispatch(isPreviewProfile());
                if (!isPreviewContent.profileIntro) {
                  try {
                    await firebase.uploadDoc(
                      "users",
                      `${userData.userID}`,
                      userData
                    );
                    firebase.changeUserImage("websites", userData);
                    firebase.changeUserImage("resumes", userData);
                    reNewPortfolioCollection();
                    dispatch(
                      setAlert({ isAlert: true, text: "成功更新個人檔案!" })
                    );
                    setTimeout(() => {
                      dispatch(setAlert({ isAlert: false, text: "" }));
                    }, 3000);
                  } catch (e) {
                    dispatch(setAlert({ isAlert: true, text: `${e}` }));
                    setTimeout(() => {
                      dispatch(setAlert({ isAlert: false, text: "" }));
                    }, 3000);
                  }
                }
              }}
            >
              <p id="editProfileData">
                {isPreviewContent.profileIntro ? "編輯個人資料" : "儲存編輯"}
              </p>
            </EditBtn>
          ) : (
            <>
              <EditBtn to={"#"}>
                <FollowBtn profileData={profileData} />
              </EditBtn>

              <ChatButton profileData={profileData} />
            </>
          )}
          <EditBtn to={`/follow/${profileData.userID}`}>
            <p id="checkFollowingList">查看追蹤名單</p>
          </EditBtn>
        </EditArea>
      </ImageContainer>
    </Wrapper>
  );
};

export default MemberIntro;
