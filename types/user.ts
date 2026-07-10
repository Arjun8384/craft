export type UserRole = "admin" | "staff";

export interface IUser {
  _id?:string;
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}