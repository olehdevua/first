import { createSelector } from "reselect";

import { UserStatusType } from "../constants";
import { State } from "../reducer";
import { UserState } from "../actions/user";

interface UserInfo {
  name: string;
  status: UserStatusType;
  email: string;
  rate: number;
}

//export const userInfoSelector = createSelector<State, UserState, UserInfo>(
export const userInfoSelector = createSelector(
  state => state.user,
  ({ name, status, email, rate }) : UserInfo => ({ name, status, email, rate })
);

export const isAuthenticatedSelector = createSelector(
  state => state.user,
  ({ token }) => !!token
);
