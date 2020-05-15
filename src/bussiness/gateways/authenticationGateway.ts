import { UserType } from "../entities/User";


export interface AuthenticationGateway {
  generateToken(input: UsersInfoForToken, expiresIn: string): string;
  getUsersInfoFromToken(token: string): UsersInfoForToken;
}

// userId, type

export interface UsersInfoForToken {
  id: string;
  type?: UserType;
  userDevice?: string;
}