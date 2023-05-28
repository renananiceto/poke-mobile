export const pokemonColorType: Record<string, string> = {
  grass: "#78C850",
  fire: "#F08030",
  poison: "#7F8C8D",
  water: "#6890F0",
};

export const getIdPokemon = (name: string) => {
  const formatName = name?.split("/");
  return formatName[formatName?.length - 2];
};
