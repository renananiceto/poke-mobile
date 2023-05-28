import axios, { AxiosInstance } from "axios";

class PokemonAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://pokeapi.co/api/v2/",
    });
  }

  async getPokemon(id: number) {
    try {
      const response = await this.api.get(`pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getAllPokemons(offset = 0) {
    try {
      const response = await this.api.get(`pokemon/?limit=20&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default new PokemonAPI();
