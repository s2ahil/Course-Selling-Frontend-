
import { userState } from "../atoms/user";
import {selector} from "recoil";


// give part of my item
export const userEmailState = selector({
  key: 'userEmailState',
  get: ({get}) => {
    const state = get(userState);

    return state.userEmail;
  },
});