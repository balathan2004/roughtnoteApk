import MasonryList from "reanimated-masonry-list";
import { styles as globalStyles } from "@/styles/global.css";
import { styles } from "@/styles/home.css";
import { View, Text, ScrollView } from "react-native";
import HoverCard from "@/components/elements/hover_card";
import { serverUrl } from "@/constants/env";
import { useUserContext } from "@/components/context/user_context";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import { useEffect, useMemo, useState } from "react";
import { docInterface, docResponse, wholeDoc } from "@/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { useNetworkContext } from "@/components/context/network_wrapper";
import { getData, storeData } from "@/components/credStore";
import { useDocContext } from "@/components/context/doc_wrapper";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { userCred, setUserCred } = useUserContext();
  const { setLoading } = useLoadingContext();
  const { setReply } = useReplyContext();
  const { isOnline } = useNetworkContext();
  const { docData, setDocData } = useDocContext();

  const docs = useMemo(() => docData?.data ?? [], [docData]);

  const fetchData = async () => {
    
  };

  useEffect(() => {
    if (userCred) {
      fetchData();
    }
  }, [userCred]);

  return (
    <View style={globalStyles.container}>
      <Text style={[styles.centerText, { color: colors.text }]}>
        Your Notes
      </Text>
      <View style={styles.home_container}>
      
        <MasonryList // Specify the generic type
          data={docs ?? []}
          keyExtractor={(item) => item.id} // Explicit cast
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: { item: unknown; i: number }) => {
            const typedItem = item as docInterface; // Type assertion
            return <HoverCard data={typedItem} />;
          }}
        />
      </View>
    </View>
  );
}
