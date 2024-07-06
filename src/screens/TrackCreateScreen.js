import "../_mockLocation";

import React, { useContext, useCallback } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";

import { Context as LocationContext } from "../context/LocationContext";
import { useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = () => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const cb = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const focus = useIsFocused();
  const [err] = useLocation(focus || recording, cb);

  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
  },
});

export default TrackCreateScreen;
