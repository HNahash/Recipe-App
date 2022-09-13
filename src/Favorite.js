import React, { useEffect, useState } from "react";

import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import "react-native-gesture-handler";
import { auth, db } from "../firebase";

export default function Favorite({ navigation }) {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //Get data from Favorite inside the Firestore
  const getData = async () => {
    try {
      var user = auth.currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      setItems(
        db
          .collection("users")
          .doc(uid)
          .collection("favorites")
          .get()
          .then((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              const item = doc.data();
              items.push(item);
            });
            setItems(items);
          })
      );
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => `${item.id}${index}`}
          refreshControl={<RefreshControl onRefresh={getData} />}
          renderItem={({ item, index }) => (
            <View style={styles.page}>
              <Image style={styles.img} source={{ uri: item?.img }} />
              <View style={styles.body}>
                <View style={styles.inner}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.smalltext}>{item.type}</Text>
                  </View>
                  <View style={styles.dummy} />
                  <View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("NestedScreen", {
                          item,
                        })
                      }
                      style={styles.button}
                    >
                      <Text> More info</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flexDirection: "row",
    marginBottom: 40,
    padding: 20,
    backgroundColor: "#fce5cd",
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#000000",
  },
  img: {
    flex: 1,
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  dummy: {
    width: "30%",
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    flex: 1,
    color: "#000000",
    fontSize: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  smalltext: {
    flex: 1,
    color: "#000000",
    fontSize: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  button: {
    flex: 1,
    backgroundColor: "#f6b26b",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
});
