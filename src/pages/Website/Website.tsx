import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { websiteChoice } from "./websiteComponents";
import PortfolioAreaCom from "./WebsiteComponents/PortfolioAreaCom";
import AddWebsiteCom from "./AddWebsiteCom";
import Delete from "../Resume/Delete";
import Move from "../../utilis/Move";

import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  websiteAddCom,
  websiteDeleteCom,
  websiteAddSetting,
  websiteRenewContent,
  websiteLoading,
  isPreviewWebsite,
  isPreviewTrue,
} from "../../action";
import { WebsiteComponents } from "./websiteComponents";
import { Link } from "react-router-dom";

export interface websiteComContent {
  image: string[];
  text: string[];
  type: number;
  comName: string;
  id: string;
  portfolioID?: string[];
}

const Website = () => {
  const websiteID = useParams().id;
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );
  const userData = useSelector((state: RootState) => state.UserReducer);

  const addWebsiteCom = (conIndex: number) => {
    dispatch(websiteAddCom(websiteChoice[conIndex].comContent));
  };

  const addDeleteCom = (deleteIndex: number) => {
    dispatch(websiteDeleteCom(deleteIndex));
  };

  const uploadWebsite = () => {
    const tempWebsiteData = websiteData;
    tempWebsiteData.time = Date.now();
    firebase.uploadDoc("websites", userData.userID, websiteData);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items: websiteComContent[] = [...websiteData.content];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(websiteRenewContent(items));
  };

  useEffect(() => {
    const loadWebsite = async () => {
      const websiteData = await firebase.readData("websites", `${websiteID}`);
      if (websiteData) {
        dispatch(websiteLoading(websiteData));
      } else {
        dispatch(websiteAddSetting("name", userData.name));
        dispatch(websiteAddSetting("userID", userData.userID));
      }
    };
    loadWebsite();
    return () => {
      dispatch(isPreviewTrue("website"));
    };
  }, [userData]);

  return (
    <WebsiteBody>
      <Wrapper>
        {websiteID === userData.userID ? (
          <PreviewBtn
            onClick={() => {
              dispatch(isPreviewWebsite());
            }}
          >
            {isPreview ? (
              <>
                <FontAwesomeIcon icon={faPen} />
                <span> 編輯</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEye} />
                <span> 預覽</span>
              </>
            )}
          </PreviewBtn>
        ) : null}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <WebsiteLayouts
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <PreviewDiv
                  style={{ zIndex: isPreview ? "2" : "-1" }}
                ></PreviewDiv>
                {websiteData.content?.map(
                  (content: websiteComContent, index: number) => {
                    const TempCom =
                      WebsiteComponents[
                        content.comName as keyof typeof WebsiteComponents
                      ];
                    return (
                      <Draggable
                        key={content.id}
                        draggableId={content.id}
                        index={index}
                      >
                        {(provided) => (
                          <SingleComponent
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <TempCom
                              index={index}
                              content={content}
                              userID={userData.userID}
                            />
                            <Delete addDeleteCom={addDeleteCom} index={index} />
                            <Move />
                          </SingleComponent>
                        )}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </WebsiteLayouts>
            )}
          </Droppable>
        </DragDropContext>
        {isPreview ? null : (
          <AddWebsiteCom
            addWebsiteCom={addWebsiteCom}
            uploadWebsite={uploadWebsite}
          />
        )}
      </Wrapper>
      <ResumeBtn onClick={uploadWebsite}>上架網站!</ResumeBtn>
    </WebsiteBody>
  );
};

export default Website;

const WebsiteBody = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 120px 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
  /* border: 1px solid; */
`;

const PreviewBtn = styled.div`
  position: fixed;
  top: 180px;
  right: 25px;
  background-color: #ffffff;
  padding: 5px 8px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const WebsiteLayouts = styled.div`
  position: relative;
  display: flex;
  width: 960px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PreviewDiv = styled.div`
  position: absolute;
  width: 900px;
  height: 100%;
  z-index: 2;
`;

const SingleComponent = styled.div`
  display: flex;
  width: 960px;
  position: relative;
  margin: 10px 0;
`;

const ResumeBtn = styled.button`
  color: #555555;
  background-color: #ffffff;
  padding: 8px;
  width: 120px;
  border-radius: 5px;
  font-weight: 600;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 20px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
`;
