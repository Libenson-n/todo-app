export interface LoggedInUserContextType {
  loggedInUser: string | null;
  logoutUser: () => void;
  login: (userId: string) => void;
}
