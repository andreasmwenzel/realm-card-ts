import * as Realm from "realm-web";
import { app } from "./RealmApp";
import React, { ReactNode, useState } from "react";

export type UserContextType = {
  user: Realm.User | null;
  setUser: (user: Realm.User | null) => void;
};

export const RealmUserContext = React.createContext<
  UserContextType | undefined
>(undefined);
export const useUserContext = () => React.useContext(RealmUserContext);

export const UserProvider: React.FC<ReactNode> = ({ children }) => {
  const [user, setUser] = useState<Realm.User | null>(app.currentUser);
  return (
    <RealmUserContext.Provider value={{ user, setUser }}>
      {children}
    </RealmUserContext.Provider>
  );
};
