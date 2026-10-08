import type { Types } from "mongoose";

export interface Betta {
  id: number;
  name: string;
  strain: string;
  gender: string;
  age: number;
  price: number;
  status: string;
  image?: string;
  description?: string;
}

export type BettaDoc = Omit<Betta, "id"> & {
  studentId: Types.ObjectId;
};

export type NewBettaBody = Pick<
  Betta,
  "name" | "strain" | "gender" | "age" | "price"
> &
  Pick<Betta, "image" | "description">;

  export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};