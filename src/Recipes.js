import React, { useEffect, useState } from "react";

import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

import "react-native-gesture-handler";

export default function Recipes({ navigation }) {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [Ingred, setIngred] = useState([]);

  // Getting the Data from the API
  const getData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "a49867877amsh125c6516a8427c6p11275ejsn83456f0ee560",
          "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
        },
      };
      //const id1 = "tracking-id";
      const response = await fetch(
        "https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0",
        options
      );
      const recipes = await response.json();
      const _recipes = (recipes?.feed || []).map((feed) => {
        return {
          name: feed?.display?.displayName || "",
          img: feed?.display?.images?.[0] || "",
          type: feed?.type || "",

          //*to check the Ingrediens which require multi mapping (due to multi ingredients stored inside:
          //* (Feed > content >ingredientLines )
          ingredients: (feed?.content?.ingredientLines || []).map((feed2) => {
            return {
              ingredient: feed2?.ingredient || "",
              unit: feed2?.unit || "",
              quantity: feed2?.quantity || "",
            };
          }),
        };
      });
      setItems(_recipes || []);
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
          renderItem={({ item, index }) => (
            <View style={styles.page}>
              <Image style={styles.img} source={{ uri: item?.img || " " }} />
              <View style={styles.body}>
                <View style={styles.inner}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.smalltext}>
                      id: {item.type}, {item.id}
                    </Text>
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
    fontSize: 10,
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
