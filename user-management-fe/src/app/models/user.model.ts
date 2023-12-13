import { UserRole } from "./user-role.model";

export interface User {
    userId: number; 
    username: string;
    password: string;
    email: string;
    roles?: UserRole[];
  }

 
  