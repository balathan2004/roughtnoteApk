import React, { useState, useContext, FC } from "react";

type replyType = null | string;

interface ReplyContextType {
  reply: replyType;
  setReply: React.Dispatch<React.SetStateAction<replyType>>;
}

interface Props {
  children: React.ReactNode;
}

export const ReplyContext = React.createContext<ReplyContextType>({
  reply: null,
  setReply: () => {},
});

const ReplyHolder: FC<Props> = ({ children }) => {
  const [reply, setReply] = useState<replyType>(null);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
};

export const useReplyContext = () => useContext(ReplyContext);

export default ReplyHolder;
