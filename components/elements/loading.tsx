import { View, ActivityIndicator } from "react-native";
import { styles } from "@/styles/global.css";
import { useLoadingContext } from "../context/loading_context";
export default function LoadingIndicator() {
  const { loading } = useLoadingContext();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }
}
