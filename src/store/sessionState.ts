export interface SessionRootState {
  loggedIn: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    role: number;
  };
}
