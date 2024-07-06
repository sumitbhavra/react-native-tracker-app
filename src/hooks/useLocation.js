import { useState, useEffect, useRef } from "react";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const subscriberRef = useRef(null);

  useEffect(() => {
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
        subscriberRef.current = sub;
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriberRef.current) {
        subscriberRef.current.remove();
      }
      subscriberRef.current = null;
    }
    return () => {
      // cleaning up watchPositionAsync call again and again
      if (subscriberRef.current) {
        subscriberRef.current.remove();
      }
    };
  }, [shouldTrack, callback]); // props, state, context
  // oh a new version of callback I should rerun the useEffect fn

  return [err];
};
