export class PokeAPIPage {
  baseUrlApi: string;

  constructor() {
    this.baseUrlApi = 'https://pokeapi.co/api/v2';
  }

  async getPokemonList(request: any) {
    return await request.get(`${this.baseUrlApi}/pokemon`);
  }

  async getPokemonById(request: any, id: number) {
    return await request.get(`${this.baseUrlApi}/pokemon/${id}`);
  }

  async getPokemonByName(request: any, name: string) {
    return await request.get(`${this.baseUrlApi}/pokemon/${name}`);
  }

  async getPokemonByType(request: any, type: string) {
    return await request.get(`${this.baseUrlApi}/type/${type}`);
  }

  async getPokemonAbility(request: any, ability: string) {
    return await request.get(`${this.baseUrlApi}/ability/${ability}`);
  }
}