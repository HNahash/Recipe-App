import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    });
    return unsubscribe;
  }, []);

  //* Sign Up Method
  const HandlerSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password).then((success) => {
      var user = auth.currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      const userData = {
        Email: email,
        Name: name,
      };
      db.collection("users")
        .doc(uid)
        .set(userData)
        .then(() => {
          alert("Your Account Created");
        })
        .catch((error) => alert(error));
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#00ff", fontSize: 15, marginBottom: 15 }}>
            Already have an account?
          </Text>
        </Pressable>
        <TouchableOpacity onPress={HandlerSignUp} style={styles.button}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "50%",
  },
  text: {
    color: "#00dd",
    fontSize: 20,
    margin: 20,
    paddingTop: 20,
    alignItems: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#3d85c6",
    width: "40%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
});

export default Register;
