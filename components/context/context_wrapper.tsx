import { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_context";
import { docResponse, wholeDoc } from "../interfaces";
import ReplyPopUp from "../elements/replyPopup";
import { serverUrl } from "@/constants/env";
import LoadingProgress from "../elements/loading";
import { useDocContext } from "./doc_wrapper";
import { useNetworkContext } from "./network_wrapper";
import { getData } from "../credStore";
import { Alert } from "react-native";
import { useReplyContext } from "./reply_context";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { docData, setDocData } = useDocContext();
  const { userCred } = useUserContext();
  const { isOnline } = useNetworkContext();
  const { setReply } = useReplyContext();

  async function fetchDoc() {
    const response = await fetch(`${serverUrl}/api/docs/get_docs`, {
      body: JSON.stringify({ uid: userCred?.uid }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const localDoc = (await getData("doc_data")) as wholeDoc | null;

    if (!isOnline) {
      if (localDoc) {
        setDocData(localDoc);
      } else {
        // maybe show a "No offline data available" state or just empty
        setDocData({ data: [], metadata: { lastUpdated: 0 } });
      }
      return;
    }
    const res = (await response.json()) as docResponse;

    if (res && res.status == 200 && res.docData) {
      if (
        !localDoc ||
        res.docData.metadata.lastUpdated >= localDoc.metadata.lastUpdated
      ) {
        setDocData(res.docData);
      } else {
        setDocData(localDoc);
        fetch(`${serverUrl}/api/docs/overwrite_doc`, {
          body: JSON.stringify({ docData: localDoc }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((err) => console.log("overwrite_doc failed", err));
      }
    }
  }

  useEffect(() => {
    fetchDoc();
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
