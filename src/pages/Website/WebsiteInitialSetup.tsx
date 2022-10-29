import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../../reducers";
import { websiteAddSetting } from "../../action/WebsiteReducerAction";

import firebase from "../../utilis/firebase";
import initialWebsite from "../../images/initialWebsite.png";
import useAlertCalling from "../../components/useAlertCalling";

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 40px;
  background-color: #eaeaea;
  border-radius: 15px;
  @media screen and (max-width: 1279px) {
    width: 85vw;
  }
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
  background-color: #ffffff;
  @media screen and (max-width: 1279px) {
    width: 80vw;
  }
`;
const ImageLabel = styled.label`
  font-size: 150%;
  cursor: pointer;
`;

const AddImgBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f1f1f1b3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const ImageInput = styled.input`
  display: none;
`;

const InputFrame = styled.input`
  width: 200px;
  height: 40px;
`;

const WebsiteInitialSetup = ({
  setIsLargeLoading,
}: {
  setIsLargeLoading: (value: boolean) => void;
}) => {
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const dispatch = useDispatch();
  const { startAlert } = useAlertCalling();

  const setWebsiteCoverImage = async (file: File) => {
    setIsLargeLoading(true);
    const imageUrl = await firebase.getImageUrl(file);
    dispatch(websiteAddSetting("coverImage", imageUrl));
    setIsLargeLoading(false);
  };
  return (
    <Wrapper>
      <Intro>請先新增顯示在個人頁面的網站圖片</Intro>
      <SettingArea>
        <ImageContainer>
          <ImagePreview
            previewUrl={
              websiteData.coverImage ? websiteData.coverImage : initialWebsite
            }
          >
            <ImageLabel>
              <AddImgBtn>
                <FontAwesomeIcon icon={faPlus} />
              </AddImgBtn>
              <ImageInput
                type="file"
                id="postImage"
                onChange={(e) => {
                  if (e.target.files![0].type.indexOf("image") == -1) {
                    startAlert("上傳檔案格式錯誤，請重新選擇圖片上傳");
                    return;
                  }
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
