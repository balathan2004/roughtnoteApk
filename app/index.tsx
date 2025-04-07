import React, { Component, useEffect } from "react";
import { useUserContext } from "@/components/context/user_context";
import { router } from "expo-router";
import { useLoadingContext } from "@/components/context/loading_context";
import { userInterface } from "@/components/interfaces";
import { Image, View } from "react-native";
import { styles } from "@/styles/global.css";
const image = require("../assets/images/roughnote.png");
import { getData } from "@/components/credStore";

export default function index() {
  const { setUserCred } = useUserContext();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        setLoading(true);
        const userCred = (await getData("userData")) as userInterface;

        setTimeout(() => {
          if (userCred) {
            setUserCred(userCred);
            router.replace("/(tabs)"); // Navigate to tabs if logged in
          } else {
            router.replace("/(auth)"); // Navigate to auth if not logged in
          }
        }, 500);
      } catch (err) {
        console.log("error is", err);
      } finally {
        setLoading(false);
      }
    };
    checkUserLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={image} />
    </View>
  );
}
