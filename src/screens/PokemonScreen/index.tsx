// Libs
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";

// Utils
import { pokemonColorType } from "../../utils/consts";

// Types
type PokemonParams = {
  Pokemon: {
    id: number;
    name: string;
  };
};

interface PokemonScreenProps {
  route: RouteProp<PokemonParams, "Pokemon">;
}

export const PokemonScreen = ({ route }: PokemonScreenProps) => {
  const { name, id } = route.params;

  const [pokemon, setPokemon] = useState<any>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      setPokemon(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
          {name}
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
          #{id}
        </Text>
      </View>

      <View style={styles.wrapperDetails}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Image
              style={{
                width: 300,
                height: 300,
              }}
              source={{ uri: pokemon?.sprites?.front_default }}
            />
            <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
              {pokemon?.types?.map((type: any) => (
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    color: "#fff",
                    backgroundColor: pokemonColorType[type.type.name],
                  }}
                  key={type.type.name}
                >
                  {type.type.name}
                </Text>
              ))}
            </View>
          </>
        )}
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
    backgroundColor: "green",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  wrapperDetails: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
  },
});
