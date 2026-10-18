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
  Partial<Pick<Betta, "image" | "description">>;

export interface Plant {
  id: number;
  name: string;
  type: string;
  quantity: number;
  status?: string;
  image?: string;
  description?: string;
}

export type PlantDoc = Omit<Plant, "id"> & {
  studentId: Types.ObjectId;
};

export type NewPlantBody = Pick<Plant, "name" | "type" | "quantity"> &
  Partial<Pick<Plant, "status" | "image" | "description">>;

export interface Tank {
  id: number;
  size: string;
  waterType: string;
  temperature: number;
  hasFilter: boolean;
  status?: string;
  image?: string;
  description?: string;
}

export type TankDoc = Omit<Tank, "id"> & {
  studentId: Types.ObjectId;
};

export type NewTankBody = Pick<
  Tank,
  "size" | "waterType" | "temperature" | "hasFilter"
> &
  Partial<Pick<Tank, "status" | "image" | "description">>;

export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};