import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import { Text } from "react-native-paper";
import NoIssue from "./screens/Support/NoIssue";
import ResolvedIssues from "./screens/Support/ResolvedIssues";


const Issues = () => {
  const [isActive, setIsActive] = useState(true);
  const [issues, setIssues] = useState<string[]>(["No rice"])

  let ScreenToRender;

  if (isActive) {
    ScreenToRender = issues.length > 0 ? <Text>{issues}</Text> : <NoIssue />
  } else {
    ScreenToRender = issues.length > 0 ? <ResolvedIssues /> : <NoIssue />
  }
  
  // Animated value for the slider
  const translateX = useRef(new Animated.Value(0)).current;

  const handleToggle = (active: boolean) => {
    setIsActive(active);

    Animated.spring(translateX, {
      toValue: active ? 0 : 1, // 0 = left, 1 = right
      useNativeDriver: true,
    }).start();
  };

  // Interpolate slider position
  const sliderTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 230], // adjust width to match your buttons
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          {/* Sliding Highlight */}
          <Animated.View
            style={[
              styles.slider,
              {
                transform: [{ translateX: sliderTranslate }],
              },
            ]}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleToggle(true)}
          >
            <Text
              variant="titleMedium"
              style={isActive ? styles.activeText : styles.inactiveText}
            >
              Ongoing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleToggle(false)}
          >
            <Text
              variant="titleMedium"
              style={!isActive ? styles.activeText : styles.inactiveText}
            >
              Resolved
            </Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
      {ScreenToRender}
    </View>
  );
};

export default Issues;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
    paddingVertical: 30,
  },
  subContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  slider: {
    position: "absolute",
    width: "50%", // covers one button
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  activeText: {
    color: "#02C27F",
    fontWeight: "600",
  },
  inactiveText: {
    color: "#777",
  } 
});
