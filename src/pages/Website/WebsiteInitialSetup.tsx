import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utilis/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { websiteAddSetting } from "../../action";
import InitialImg from "../../utilis/cater.png";

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 40px;
  background-color: #eaeaea;
  border-radius: 15px;
`;

const Intro = styled.p`
  margin-top: 40px;
`;

const SettingArea = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto 40px;
`;

const ImagePreview = styled.div<{ previewUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 620px;
  height: 360px;
  border: solid 1px black;
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

const InputFrame = styled.input`
  width: 200px;
  height: 40px;
`;

const WebsiteInitialSetup = () => {
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const dispatch = useDispatch();
  const setWebsiteCoverImage = async (file: File) => {
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(websiteAddSetting("coverImage", imageUrl));
  };
  return (
    <Wrapper>
      <Intro>請先新增顯示在個人頁面的網站圖片</Intro>
      <SettingArea>
        <ImageContainer>
          <ImagePreview previewUrl={websiteData.coverImage}>
            <ImageLabel>
              +
              <ImageInput
                type="file"
                id="postImage"
                onChange={(e) => {
                  setWebsiteCoverImage(e.target.files![0]);
                }}
              />
            </ImageLabel>
          </ImagePreview>
        </ImageContainer>
      </SettingArea>
    </Wrapper>
  );
};

export default WebsiteInitialSetup;
