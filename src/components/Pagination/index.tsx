import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaginationProps {
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const handlePreviousPage = () => {
    const prevOffset = currentOffset - itemsPerPage;
    if (prevOffset >= 0) {
      setCurrentOffset(prevOffset);
      onPageChange(prevOffset);
    }
  };

  const handleNextPage = () => {
    const nextOffset = currentOffset + itemsPerPage;
    if (nextOffset <= (totalPages - 1) * itemsPerPage) {
      setCurrentOffset(nextOffset);
      onPageChange(nextOffset);
    }
  };

  const startItemIndex = currentOffset + 1;
  const endItemIndex = Math.min(
    currentOffset + itemsPerPage,
    totalPages * itemsPerPage
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePreviousPage}>
        <Text style={styles.buttonText}>{"< Previous"}</Text>
      </TouchableOpacity>
      <Text
        style={styles.currentPageText}
      >{`${startItemIndex}-${endItemIndex}`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNextPage}>
        <Text style={styles.buttonText}>{"Next >"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  currentPageText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
