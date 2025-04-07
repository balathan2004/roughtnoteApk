import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/notes.css";
import { View, Text, Pressable } from "react-native";
import { serverUrl } from "@/constants/env";
import { useUserContext } from "@/components/context/user_context";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import { useEffect, useState } from "react";
import {
  docInterface,
  docResponse,
  ResponseConfig,
  wholeDoc,
} from "@/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { Tabs, useLocalSearchParams } from "expo-router";
import { getData, storeData } from "@/components/credStore";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import lodash from "lodash";
import { useDocContext } from "@/components/context/doc_wrapper";
import { useNetworkContext } from "@/components/context/network_wrapper";

export default function HomeScreen() {
  const { colors } = useTheme();
  const doc_id = useLocalSearchParams().doc_id as string;
  const { docData, setDocData } = useDocContext();
  const { setReply } = useReplyContext();
  const { setLoading } = useLoadingContext();
  const [currentDocData, setCurrentDocData] = useState<docInterface | null>(
    null
  );
  const { isOnline } = useNetworkContext();
  const [isEditted, setIsEditted] = useState(false);
  const [caption, setCaption] = useState("");
  const [docName, setDocName] = useState("");
  const [nameInputHeight, setNameInputHeight] = useState(50);
  const [textInputHeight, setTextInputHeight] = useState(50);

  const handleInput = (name: string, text: string) => {
    if (name == "doc_name") {
      setDocName(text);
      setIsEditted(text.trim() !== currentDocData?.doc_name);
    } else if (name == "doc_text") {
      setCaption(text);
      setIsEditted(text.trim() !== currentDocData?.doc_text);
    }
  };

  const handleSubmit = async () => {
    if (!isEditted) {
      return;
    }

    const newDoc = currentDocData
      ? { ...currentDocData, doc_text: caption || "", doc_name: docName || "" }
      : null;

    if (!newDoc) {
      return;
    }

    setLoading(true);

    const timeStamp = new Date().getTime();

    setCurrentDocData(newDoc);

    if (isOnline) {
      await sendData({ ...newDoc, timeStamp });
    }

    setDocData((prev) => {
      const filtered = prev?.data.filter(
        (item) => item.doc_id !== currentDocData?.doc_id
      );

      const newArray = [...(filtered || []), newDoc];
      const metadata = {
        lastUpdated: timeStamp,
      };

      return { data: newArray, metadata }; // Return filtered array instead of null
    });
  };

  async function sendData(data: object) {
    const response = await fetch(`${serverUrl}/api/docs/update_doc`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = (await response.json()) as ResponseConfig;

    if (res) {
      setReply(res.message);
    }
  }

  useEffect(() => {
    async function handler() {
      if (!docData) {
        return;
      }

      setCurrentDocData(() => {
        const newData =
          docData.data.find((item) => item.doc_id === doc_id) || null;
        setCaption(newData?.doc_text || "");
        setDocName(newData?.doc_name || "");
        return newData;
      });
    }
    handler();
  }, [doc_id]);

  return (
    <View style={globalStyles.container}>
      <Tabs.Screen
        options={{
          headerTitle: currentDocData ? currentDocData.doc_name : "note",
        }}
      />
      <View style={styles.container}>
        <View>
          <Pressable onPress={handleSubmit} style={styles.icon_holder}>
            <Ionicons name="save-outline" size={24} color={colors.text} />
            <Text style={{ color: colors.text }}>
              {isEditted ? "unsaved changes" : "no changes made"}
            </Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            onContentSizeChange={(event) =>
              setNameInputHeight(event.nativeEvent.contentSize.height)
            }
            style={[styles.input, { height: Math.max(50, nameInputHeight) }]}
            multiline
            value={docName}
            onChangeText={(text) => handleInput("doc_name", text)}
          ></TextInput>

          <Text style={[styles.labelCount, { color: colors.text }]}>
            {docName.length}/200 chars
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            onContentSizeChange={(event) =>
              setTextInputHeight(event.nativeEvent.contentSize.height)
            }
            style={[styles.input, { height: Math.max(50, textInputHeight) }]}
            multiline
            value={caption}
            onChangeText={(text) => handleInput("doc_text", text)}
          ></TextInput>
          <Text style={[styles.labelCount, { color: colors.text }]}>
            {caption.length}/1048 chars
          </Text>
        </View>
      </View>
    </View>
  );
}
