import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safearea: {
    margin: 0,
    flex: 1,
    position: "relative",
    justifyContent: "flex-start",
  },
  snackbarContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's on top
  },
  snackbar: {
    width: "95%",
    alignSelf: "center",
  },
  snackbar_text: {
    textTransform: "capitalize",
  },

  container: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginTop: 50,
    margin: "auto",
  },
  button: {
    marginTop: 20,
    width: "75%",
    margin: "auto",
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
  },
  loader: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
