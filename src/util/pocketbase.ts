import { PB_URL } from "@env";
import PocketBase from "pocketbase";

export const pb = new PocketBase(PB_URL);
export const PB_FILES = `${PB_URL}api/files`;
export const PB_CUSTOM_ROUTES = "/hooks";

export type PbErrorMessage =
  | "Failed to create record."
  | "Failed to authenticate."
  | "You are not allowed to perform this request.";

export type PbError = {
  status: number;
  url: string;
  message: PbErrorMessage;
};
