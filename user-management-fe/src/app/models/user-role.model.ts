import { Role } from "./role.model";
import { User } from "./user.model";

export interface UserRole {
    user: User;
    userRoleId: number;
    role: Role;
  }
