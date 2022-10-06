import { DocumentData } from "firebase/firestore";
import { ActionType } from "../reducers";

export const initialSetUserData = (type: string, data: string) => {
  return {
    type: ActionType.USER.INPUT_EMAIL_PASSWORD,
    payload: { type, data },
  };
};

export const userLoading = (data: DocumentData) => {
  return {
    type: ActionType.USER.LOADING,
    payload: { data },
  };
};
