import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const Delete = ({
  addDeleteCom,
  index,
}: {
  addDeleteCom: (index: number) => void;
  index: number;
}) => {
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.website
  );

  return (
    <div>
      <button
        onClick={() => {
          addDeleteCom(index);
        }}
        style={{ display: isPreview ? "none" : "block" }}
      >
        delete
      </button>
    </div>
  );
};

export default Delete;
