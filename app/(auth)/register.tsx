import React, { FC, useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
  Image,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { styles } from "@/styles/auth.css";
import { serverUrl } from "@/constants/env";
import { useReplyContext } from "@/components/context/reply_context";
import { UserCredResponse } from "@/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { useLoadingContext } from "@/components/context/loading_context";
import { storeData } from "@/components/credStore";
const image = require("../../assets/images/roughnote.png");
const SignUp: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setReply } = useReplyContext();
  const { loading, setLoading } = useLoadingContext();
  const { colors } = useTheme();
  const router = useRouter();
  const handleInput =
    (key: string) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const inputValue = event.nativeEvent.text;

      setUserData((prevData) => ({
        ...prevData,
        [key]: inputValue.trim(),
      }));
    };

  const submitForm = async () => {
    if (!userData.email || !userData.password) {
      setReply("Email and password are required!");
      return;
    }

    if (userData.password.length < 6) {
      setReply("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    const response = await fetch(`${serverUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });
    const res = (await response.json()) as UserCredResponse;
    setLoading(false);
    if (res) {
      setReply(res.message);
      if (res.status == 200) {
        storeData("userData", res.credentials);
        router.push("/(tabs)");
      }
    }
  };

  const resetState = () => {
    setUserData({ email: "", password: "" });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetState(); // Reset state when screen is unfocused
      };
    }, [])
  );

  return (
    <View style={styles.auth_container}>
      <View style={styles.inner_container}>
        <Image source={image}></Image>
        <Text style={[styles.title, { color: colors.text }]}>
          Create New Account
        </Text>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter email
          </Text>
          <TextInput
            onChange={handleInput("email")}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none" // To prevent auto-capitalization
            autoComplete="email"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter password
          </Text>
          <TextInput
            onChange={handleInput("password")}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            placeholder="Enter password"
            keyboardType="visible-password"
            autoCapitalize="none" // To prevent auto-capitalization
            autoComplete="password"
          />
        </View>
        <Pressable
          onPress={() => {
            router.push("/(auth)");
          }}
        >
          <Text style={[styles.forget_password, { color: colors.text }]}>
            Login here
          </Text>
        </Pressable>
        <View style={styles.button}>
          <Button
            title={loading ? "Registering" : "Register"}
            disabled={loading}
            onPress={submitForm}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
