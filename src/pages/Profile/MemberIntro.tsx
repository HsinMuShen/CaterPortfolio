import React from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { initialSetUserData } from "../../action/UserReducerAction";
import {
  isPreviewProfile,
  setAlert,
} from "../../action/IsPreviewReducerAction";
import { UserReducer } from "../../reducers";

import firebase from "../../utilis/firebase";
import FollowBtn from "./FollowBtn";
import ChatButton from "./ChatButton";
import useAlertCalling from "../../components/useAlertCalling";

const Wrapper = styled.div``;

const ImageContainer = styled.div`
  display: flex;
  width: 900px;
  margin: 10px auto 0;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 80vw;
  }
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

const ImagePreview = styled.div<{
  previewUrl: string;
  width: string;
  height: string;
  borderRadius: string;
  borderWidth: string;
  mobileWidth: string;
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
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: ${(props) => props.mobileWidth};
  }
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;
const ImageInput = styled.input`
  display: none;
`;

const AddImgBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffffb3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const MainImageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 120px 0 100px;
  @media screen and (max-width: 1279px) {
    margin: 20px 60px 0 60px;
  }
`;

const IntroInput = styled.textarea`
  width: 420px;
  height: 80px;
  padding: 5px;
  @media screen and (max-width: 720px) {
    margin: 10px 0;
  }
`;

const IntroTextArea = styled.div`
  width: 420px;
  font-size: 14px;
  margin-right: 40px;
  white-space: pre;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 720px) {
    margin: 10px 0;
  }
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
  @media screen and (max-width: 1279px) {
    margin: 0 20px 0 20px;
  }
  @media screen and (max-width: 720px) {
    margin: 10px 20px 10px 20px;
  }
`;
const EditBtn = styled(Link)`
  background-color: #ffffff;
  color: #555555;
  border: 2px solid;
  width: 180px;
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

const MemberIntro = ({
  profileData,
  setProfileData,
  setIsLargeLoading,
  isCreaterArea,
  setIsCreaterArea,
}: UserReducer) => {
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isPreviewContent = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );
  const dispatch = useDispatch();
  const { startAlert } = useAlertCalling();

  const renewImageUrl = async (type: string, file: File) => {
    setIsLargeLoading(true);
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(initialSetUserData(type, imageUrl));
    setIsLargeLoading(false);
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
        mobileWidth={"78vw"}
      >
        <ImageLabel>
          {isPreviewContent.profileIntro ? (
            ""
          ) : (
            <AddImgBtn>
              <FontAwesomeIcon icon={faPlus} />
            </AddImgBtn>
          )}
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
            mobileWidth={"100px"}
          >
            <ImageLabel>
              {isPreviewContent.profileIntro ? (
                ""
              ) : (
                <AddImgBtn>
                  <FontAwesomeIcon icon={faPlus} />
                </AddImgBtn>
              )}
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
                    startAlert("成功更新個人檔案!");
                  } catch (e) {
                    startAlert("更新個人檔案失敗");
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
                <FollowBtn
                  profileData={profileData}
                  setIsLargeLoading={setIsLargeLoading}
                />
              </EditBtn>

              <ChatButton profileData={profileData} />
            </>
          )}
          <EditBtn
            to={"#"}
            onClick={() => {
              setIsCreaterArea(!isCreaterArea);
            }}
          >
            <p id="checkFollowingList">
              {isCreaterArea ? "查看收藏名單" : "查看履歷與網站"}
            </p>
          </EditBtn>
        </EditArea>
      </ImageContainer>
    </Wrapper>
  );
};

export default MemberIntro;
