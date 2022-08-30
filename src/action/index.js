import { ActionType } from "../reducers/content";

export const fillContent = () => {
  return {
    type: ActionType.FILL_CONTENT,
    payload: { content },
  };
};
