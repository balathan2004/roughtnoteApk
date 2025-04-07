import { useUserContext } from "@/components/context/user_context";
import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/profile.css";
import React, { useEffect, useState } from "react";
const image = require("@/assets/images/gewn.png");
import { View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { Button } from "react-native-paper";
import { getData } from "@/components/credStore";
import { useDocContext } from "@/components/context/doc_wrapper";

const timerSetter = (message: string, time: number) => {
  return `${message} ${formatDistanceToNow(new Date(time), {
    addSuffix: true,
  })}`;
};

export default function Profile() {
  const { userCred } = useUserContext();
  const { colors } = useTheme();
  const { docData } = useDocContext();

  const [data, setData] = useState<any>();

  useEffect(() => {
    const get = async () => {
      const newData = await getData("doc_data");
      setData(newData);
    };
    get();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.home_container}>
        <View style={styles.card}>
          <Text style={[styles.centerText, { color: colors.text }]}>
            Your Profile
          </Text>

          <Text style={[styles.centerText, { color: colors.text }]}>
            lastUpdated{docData?.metadata.lastUpdated}
          </Text>

          <View style={styles.img_container}>
            <Image style={styles.profile_avatar} source={image} />
            <Text style={[styles.label, { color: colors.text }]}>
              {userCred?.display_name}
            </Text>
          </View>
          <Text style={[styles.label, { color: colors.text }]}>
            {userCred?.email}
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>
            {timerSetter("Joined", userCred?.createdAt || 0)}{" "}
          </Text>
          <View>
            <Button style={styles.button} mode="elevated">
              LogOut
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
