import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  home_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  card_docname: {
    fontSize: 20,
    lineHeight: 40,
  },
  card_doctext: {
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    width: "100%",
    margin: "auto",
    borderRadius: 4,
  },
  profile_avatar: {
    width: 70,
    aspectRatio: 1 / 1,
    height: 70,
    borderRadius: 100,
  },
  img_container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
  },
  hr: {
    width: "100%",
    borderBlockColor: "white",
    borderWidth: 0.2,
    marginBottom: 5,
  },
});
