import { defineAction } from "astro:actions";
import { authActions } from "@aledx18/astro/actions";

export const server = {
  signin: defineAction(authActions.signin),
  signout: defineAction(authActions.signout),
  register: defineAction(authActions.register),
  forgotPassword: defineAction(authActions.forgotPassword),
  updatePassword: defineAction(authActions.updatePassword),
};
