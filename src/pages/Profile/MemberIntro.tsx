import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { isPreviewProfile, initialSetUserData } from "../../action";
import { UserReducer } from "../../reducers";
import { Link } from "react-router-dom";

import firebase from "../../utilis/firebase";
import FollowBtn from "./FollowBtn";

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
  margin: 10px 0 10px;
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
  const [imageFile, setImageFile] = useState<{
    headshot: File | null;
    backgroundImage: File | null;
  }>({
    headshot: null,
    backgroundImage: null,
  });
  const userData = useSelector((state: RootState) => state.UserReducer);
  const isPreviewContent = useSelector(
    (state: RootState) => state.IsPreviewReducer
  );
  const dispatch = useDispatch();

  const previewHeadshotUrl = imageFile.headshot
    ? URL.createObjectURL(imageFile.headshot)
    : profileData.userImage;
  const previewBackUrl = imageFile.backgroundImage
    ? URL.createObjectURL(imageFile.backgroundImage)
    : profileData.backgroundImage;

  const renewImageUrl = async (type: string, file: File) => {
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(initialSetUserData(type, imageUrl));
  };

  return (
    <Wrapper>
      <ImagePreview
        previewUrl={previewBackUrl}
        width={"100vw"}
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
              setImageFile({
                ...imageFile,
                backgroundImage: e.target.files![0],
              });
              renewImageUrl("backgroundImage", e.target.files![0]);
            }}
          />
        </ImageLabel>
      </ImagePreview>
      <ImageContainer>
        <MainImageArea>
          <ImagePreview
            previewUrl={previewHeadshotUrl}
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
                  setImageFile({
                    ...imageFile,
                    headshot: e.target.files![0],
                  });
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
              onClick={() => {
                dispatch(isPreviewProfile());
                if (!isPreviewContent.profileIntro) {
                  firebase.uploadDoc("users", `${userData.userID}`, userData);
                }
              }}
            >
              <p>
                {isPreviewContent.profileIntro ? "編輯個人資料" : "儲存編輯"}
              </p>
            </EditBtn>
          ) : (
            <FollowBtn profileData={profileData} />
          )}
          <EditBtn to={`/follow/${profileData.userID}`}>
            <p>查看追蹤名單</p>
          </EditBtn>
        </EditArea>
      </ImageContainer>
    </Wrapper>
  );
};

export default MemberIntro;
