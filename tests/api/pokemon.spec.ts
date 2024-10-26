import { test, expect } from '@playwright/test';
import { PokeAPIPage } from '../../pageObjects/api/pokemon.page.ts';
import { logResponseStatus } from '../../util/api/apiLogRequests';

test.describe('PokeAPI Tests', {
  tag: '@Pokemon_API'
}, () => {
  test('Retrieve a list of Pokémon', async ({ request }) => {
    const pokeAPIPage = new PokeAPIPage();
    console.log('BaseURL:', `${pokeAPIPage.baseUrlApi}\n`);
    const response = await pokeAPIPage.getPokemonList(request);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const pokemonList = await response.json();
    expect(pokemonList.results).toBeInstanceOf(Array);
    expect(pokemonList.results.length).toBeGreaterThan(0);
  });

  // Example GET Pokémon ID (Bulbasaur)
  test('Retrieve a single Pokémon by ID', async ({ request }) => {
    const pokeAPIPage = new PokeAPIPage();
    const pokemonName = 'bulbasaur';
    const pokemonId = 1;
    const response = await pokeAPIPage.getPokemonById(request, pokemonId);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const pokemon = await response.json();
    expect(pokemon).toHaveProperty('id', pokemonId);
    expect(pokemon).toHaveProperty('name');
    expect(pokemon.name).toBe(pokemonName);
  });

  // Example Pokémon name (smaller case letters)
  test('Retrieve a Pokémon by name', async ({ request }) => {
    const pokeAPIPage = new PokeAPIPage();
    const pokemonName = 'pikachu';
    const response = await pokeAPIPage.getPokemonByName(request, pokemonName);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const pokemon = await response.json();
    expect(pokemon).toHaveProperty('name', pokemonName);
    expect(pokemon).toHaveProperty('id');
    expect(pokemon.name).toBe(pokemonName);
  });

  // Test for retrieving a Pokémon by type
  test('Retrieve Pokémon by type', async ({ request }) => {
    const pokeAPIPage = new PokeAPIPage();
    const pokemonType = 'electric';
    const response = await pokeAPIPage.getPokemonByType(request, pokemonType);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const pokemonList = await response.json();
    expect(pokemonList.pokemon).toBeInstanceOf(Array);
    expect(pokemonList.pokemon.length).toBeGreaterThan(0);
  });

  // Test for retrieving a Pokémon ability
  test('Retrieve a Pokémon ability', async ({ request }) => {
    const pokeAPIPage = new PokeAPIPage();
    const abilityName = 'overgrow';
    const response = await pokeAPIPage.getPokemonAbility(request, abilityName);
    logResponseStatus(response);
    expect(response.status()).toBe(200);
    const ability = await response.json();
    expect(ability).toHaveProperty('name', abilityName);
    expect(ability).toHaveProperty('effect_entries');
  });
});