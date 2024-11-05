
import { adminState } from "../atoms/admin";
import {selector} from "recoil";


// give part of my item
export const adminEmailState = selector({
  key: 'adminEmailState',
  get: ({get}) => {
    const state = get(adminState);

    return state.adminEmail;
  },
});