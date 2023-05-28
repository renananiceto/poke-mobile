// Libs
import React from "react";

// Utils
import { getIdPokemon } from "../../utils/consts";

// Styles
import * as S from "./styles";

const createUrlImage = (name: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdPokemon(
    name
  )}.png`;

export const Card = ({ pokemon, onPress }: any) => {
  return (
    <S.WrapperCard onPress={onPress}>
      <S.Text>#{getIdPokemon(pokemon.url)}</S.Text>
      <S.Image source={{ uri: createUrlImage(pokemon?.url) }} />
      <S.Title>{pokemon.name}</S.Title>
    </S.WrapperCard>
  );
};
