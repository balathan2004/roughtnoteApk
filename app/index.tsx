import React, { Component, useEffect } from "react";
import { useUserContext } from "@/components/context/user_context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoadingContext } from "@/components/context/loading_context";
import { userInterface } from "@/components/interfaces";
import { Image, StyleSheet, View } from "react-native";
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
        const userCredString = await getData("userData");
        const parsedCred = userCredString
          ? (JSON.parse(userCredString) as userInterface)
          : null;
        setTimeout(() => {
          if (parsedCred) {
            setUserCred(parsedCred);
            router.replace("/(tabs)"); // Navigate to tabs if logged in
          } else {
            router.replace("/(auth)"); // Navigate to auth if not logged in
          }
        }, 3000);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkUserLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image source={image} />
      </View>
    </View>
  );
}
