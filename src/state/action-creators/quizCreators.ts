import axios from "axios";
import { Dispatch } from "react";
import { Action, CategoryQuestionProps, Quiz } from "../actions";
import { ActionType } from "../action-types";
import { shuffeArray, updateAnswer } from "../../utils/Utilities";

export const fetchQuestionReport = (
  category: CategoryQuestionProps,
  questions: Quiz[]
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_QUESTIONS,
    });
    dispatch({
      type: ActionType.FETCH_QUESTIONS_REPORT,
      category: category,
      questions: questions,
    });
  };
};

// export const fetchQuestionByCategory = (item: CategoryQuestionProps) => {
//   return "()";
// };
