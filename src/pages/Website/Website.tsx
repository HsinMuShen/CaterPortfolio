import React, { useRef } from "react";
import Canves from "./Canves";
import EditText from "../../utilis/EditText";
import firebase from "../../utilis/firebase";
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { websiteAddTime } from "../../action";

const Website = () => {
  const canvas: any = useRef();
  const storageJson = useRef("");
  const dispatch = useDispatch();
  const websiteData = useSelector((state: RootState) => state.WebsiteReducer);
  const uploadWebsite = () => {
    dispatch(websiteAddTime());
    firebase.uploadDoc("websites", websiteData);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Canves canvas={canvas} storageJson={storageJson} />
        <EditText type={"website"} text={"<p>請填入說明</p>"} index={1} />
      </div>
      <button onClick={uploadWebsite}>上架網站!</button>
    </>
  );
};

export default Website;
