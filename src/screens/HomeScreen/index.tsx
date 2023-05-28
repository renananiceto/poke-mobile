// Libs
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, ScrollView, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// Utils
import { getIdPokemon } from "../../utils/consts";

// Services
import pokemonAPI from "../../services/pokemonAPI";

// Components
import { Card, Pagination, Skeleton } from "../../components";

// Types
interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [pokemonList, setPokemonList] = useState<[]>([]);
  const [searchList, setSearchList] = useState<[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  /* const [countTotal, setCountTotal] = useState<number>(0); */

  const getData = async () => {
    setLoading(true);

    try {
      const response = await pokemonAPI.getAllPokemons(currentPage);
      setPokemonList(response.results);

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleChangeSearch = (text: string) => {
    const filter = pokemonList.filter((pokemon: any) => {
      const valueName = pokemon.name.toLowerCase();
      const valueSearch = text.toLowerCase();

      return (
        valueName.includes(valueSearch) ||
        getIdPokemon(pokemon.url).includes(valueSearch)
      );
    }) as [];

    setSearchList(filter);
  };

  const handlePress = (pokemon: any) => {
    navigation.navigate("Pokemon", {
      id: getIdPokemon(pokemon.url),
      name: pokemon.name,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={handleChangeSearch}
      />

      <View style={styles.containerCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.wrapperCard}
        >
          {loading
            ? Array(20)
                .fill(20)
                .map((_, index) => <Skeleton key={index} />)
            : (searchList || pokemonList)?.map((pokemon: any) => (
                <Card
                  key={pokemon?.name}
                  pokemon={pokemon}
                  onPress={() => handlePress(pokemon)}
                />
              ))}
        </ScrollView>

        <Pagination
          totalPages={140}
          itemsPerPage={20}
          onPageChange={handlePageChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "red",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  containerCard: {
    flex: 1,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  wrapperCard: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
});
