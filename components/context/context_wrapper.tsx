import { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_context";
import { userInterface, UserCredResponse } from "../interfaces";
import ReplyPopUp from "../elements/replyPopup";

import LoadingProgress from "../elements/loading";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { setUserCred } = useUserContext();

  useEffect(() => {
    async function getCred() {
      const response = await fetch(`/api/auth/login_cred`, {
        method: "GET",
        credentials: "include",
      });

      const res = (await response.json()) as UserCredResponse;
      if (res && res.status == 200) {
        setUserCred(res.credentials);
      }
    }
    getCred();
  }, []);

  return (
    <>
      <ReplyPopUp />

      <LoadingProgress />
      {children}
    </>
  );
};

export default ContextWrapper;
