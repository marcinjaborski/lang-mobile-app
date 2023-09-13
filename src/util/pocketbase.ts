import { PB_URL } from "@env";
import PocketBase from "pocketbase";

export const pb = new PocketBase(PB_URL);
export const PB_FILES = `${PB_URL}/api/files`;

export type pbErrorMessage =
  | "Failed to create record."
  | "Failed to authenticate."
  | "You are not allowed to perform this request.";

export type pbError = {
  status: number;
  url: string;
  message: pbErrorMessage;
};
