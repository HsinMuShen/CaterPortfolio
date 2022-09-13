import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isPreviewProfile, initialSetUserData } from "../../action";
import { UserReducer } from "../../reducers";

import firebase from "../../utilis/firebase";
import FollowBtn from "./FollowBtn";

const Wrapper = styled.div``;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ImagePreview = styled.div<{
  previewUrl: string;
  width: string;
  height: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: solid 1px black;
  //   border-radius: 90px;
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
      <ImageContainer>
        <ImagePreview
          previewUrl={previewBackUrl}
          width={"100vw"}
          height={"200px"}
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
        <ImagePreview
          previewUrl={previewHeadshotUrl}
          width={"100px"}
          height={"100px"}
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
        {isPreviewContent.profileIntro ? (
          profileData.introduction
        ) : (
          <input
            defaultValue={profileData.introduction}
            onChange={(e) => {
              dispatch(initialSetUserData("introduction", e.target.value));
              setProfileData({ ...profileData, introduction: e.target.value });
            }}
          />
        )}
        <p>{profileData.name}</p>
      </ImageContainer>
      {profileData.userID === userData.userID ? (
        <button
          onClick={() => {
            dispatch(isPreviewProfile());
            if (!isPreviewContent.profileIntro) {
              firebase.uploadDoc("users", `${userData.userID}`, userData);
            }
          }}
        >
          編輯個人頁面/儲存編輯
        </button>
      ) : (
        <FollowBtn profileData={profileData} />
      )}
    </Wrapper>
  );
};

export default MemberIntro;
