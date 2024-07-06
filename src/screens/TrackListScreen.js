import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";

const TrackListScreen = () => {
  const navigation = useNavigation();
  const { state, fetchTracks } = useContext(TrackContext);

  const focus = useIsFocused();

  useEffect(() => {
    fetchTracks();
  }, [focus]);

  console.log("focus ->", focus);
  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
  },
});

export default TrackListScreen;
