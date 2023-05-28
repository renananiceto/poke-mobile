import React, { useState, useEffect } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";

export const Skeleton = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: -1 }
    ).start();
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View
        style={[styles.skeletonTitle, { opacity, transform: [{ scale }] }]}
      />
      <Animated.View
        style={[
          styles.skeletonDescription,
          { opacity, transform: [{ scale }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  skeletonTitle: {
    width: "80%",
    height: 20,
    backgroundColor: "#e1e1e1",
    marginBottom: 10,
  },
  skeletonDescription: {
    width: "100%",
    height: 50,
    backgroundColor: "#e1e1e1",
  },
});
