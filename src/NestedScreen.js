import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import { auth, db, storageRef } from "../firebase";

const NestedScreen = ({ route }) => {
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CheckFavorite();
  }, []);

  //* Adding Recipe Details to Firestore
  const addRecipe = () => {
    var user = auth.currentUser;
    var uid;
    if (user != null) {
      uid = user.uid;
    }
    if (route?.params?.item) {
      db.collection("users")
        .doc(uid)
        .collection("favorites")
        .add({
          ...route.params.item,
        })
        .then(() => {
          alert("Added to favorite");
        })
        .catch((error) => alert(error));
    }
  };

  //*Checking if the user don't have the recipe stored as favorite then add it else delete it from favorite list
  const addOrDelete = async () => {
    try {
      var user = auth.currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      const snapshot = db
        .collection("users")
        .doc(uid)
        .collection("favorites")
        .limit(1)
        .where("name", "==", route.params.item.name)
        .get();

      //if snapshot empty meaning that the recipe is not stored as favorite
      if ((await snapshot).empty) {
        addRecipe();
        // else means the recipe is already stored in the favorite and should be deleted
      } else {
        const doc = (await snapshot).docs[0];
        doc.ref.delete();
      }
    } catch (error) {
      alert(error);
    }
  };

  //*Checking if the user have favorite recipes
  const CheckFavorite = async () => {
    try {
      var user = auth.currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      const snapshot = db
        .collection("users")
        .doc(uid)
        .collection("favorites")
        .limit(1)
        .where("name", "==", route.params.item.name)
        .get();

      //if snapshot empty meaning that the recipe is not stored as favorite
      if ((await snapshot).empty) {
        setIsFav(false);
        setIsLoading(false);
        // else means the recipe is already stored in the favorite
      } else {
        setIsFav(true);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView style={styles.page}>
      <RefreshControl onRefresh={CheckFavorite} />
      <Image style={styles.img} source={{ uri: route.params.item.img }} />
      <View style={styles.body}>
        <FAB
          style={styles.fab}
          loading={isLoading}
          icon={isFav ? "bookmark" : "bookmark-outline"}
          onPress={addOrDelete}
        />

        <Text style={styles.smallText}> Name: </Text>
        <Text style={styles.myText}>{route.params.item.name}</Text>
        <Text style={styles.smallText}>Recipe details:</Text>

        {route.params.item.ingredients.map((ing, index) => {
          return (
            <Text style={styles.myText} key={`${ing.id}${index}`}>
              {ing.ingredient}: {ing.quantity} {ing.unit}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default NestedScreen;

const styles = StyleSheet.create({
  myText: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
    textAlign: "center",
  },
  page: {
    flex: 1,
    backgroundColor: "#fff2cc",
  },
  smallText: {
    margin: 5,
  },
  body: {
    flexDirection: "column",
    marginBottom: 40,
    padding: 20,
    backgroundColor: "#fff2cc",
    fontSize: 20,
  },
  img: {
    width: "100%",
    height: 300,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    flex: 1,
    width: "15%",
    position: "absolute",

    right: 15,
    bottom: "100%",
  },
});
