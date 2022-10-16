import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setAlert } from "../action/IsPreviewReducerAction";

const useAlertCalling = () => {
  const dispatch = useDispatch();

  const startAlert = (text: string) => {
    dispatch(setAlert({ isAlert: true, text: text }));
    setTimeout(() => {
      dispatch(setAlert({ isAlert: false, text: "" }));
    }, 3000);
  };
  return { startAlert };
};

export default useAlertCalling;
