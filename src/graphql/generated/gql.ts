/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateTeam($name: String!) {\n    createTeam(name: $name) {\n      id\n      name\n    }\n  }\n": typeof types.CreateTeamDocument,
    "\n  mutation AddPokemonToTeam($pokemonId: Int!) {\n    addPokemonToTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": typeof types.AddPokemonToTeamDocument,
    "\n  mutation AddPokemonToTeamByName($pokemonName: String!) {\n    addPokemonToTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": typeof types.AddPokemonToTeamByNameDocument,
    "\n  mutation RemovePokemonFromTeam($pokemonId: Int!) {\n    removePokemonFromTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": typeof types.RemovePokemonFromTeamDocument,
    "\n  mutation RemovePokemonFromTeamByName($pokemonName: String!) {\n    removePokemonFromTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": typeof types.RemovePokemonFromTeamByNameDocument,
    "\n  query FindAllTeams {\n    findAllTeams {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n": typeof types.FindAllTeamsDocument,
    "\n  query FindTeamById($id: ID!) {\n    findTeamById(id: $id) {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n": typeof types.FindTeamByIdDocument,
    "\n  query me {\n    me {\n      id\n      name\n      email\n      team {\n        id\n        name\n        pokemons{\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.MeDocument,
};
const documents: Documents = {
    "\n  mutation CreateTeam($name: String!) {\n    createTeam(name: $name) {\n      id\n      name\n    }\n  }\n": types.CreateTeamDocument,
    "\n  mutation AddPokemonToTeam($pokemonId: Int!) {\n    addPokemonToTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": types.AddPokemonToTeamDocument,
    "\n  mutation AddPokemonToTeamByName($pokemonName: String!) {\n    addPokemonToTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": types.AddPokemonToTeamByNameDocument,
    "\n  mutation RemovePokemonFromTeam($pokemonId: Int!) {\n    removePokemonFromTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": types.RemovePokemonFromTeamDocument,
    "\n  mutation RemovePokemonFromTeamByName($pokemonName: String!) {\n    removePokemonFromTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n": types.RemovePokemonFromTeamByNameDocument,
    "\n  query FindAllTeams {\n    findAllTeams {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n": types.FindAllTeamsDocument,
    "\n  query FindTeamById($id: ID!) {\n    findTeamById(id: $id) {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n": types.FindTeamByIdDocument,
    "\n  query me {\n    me {\n      id\n      name\n      email\n      team {\n        id\n        name\n        pokemons{\n          id\n          name\n        }\n      }\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTeam($name: String!) {\n    createTeam(name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTeam($name: String!) {\n    createTeam(name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddPokemonToTeam($pokemonId: Int!) {\n    addPokemonToTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\n  mutation AddPokemonToTeam($pokemonId: Int!) {\n    addPokemonToTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddPokemonToTeamByName($pokemonName: String!) {\n    addPokemonToTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\n  mutation AddPokemonToTeamByName($pokemonName: String!) {\n    addPokemonToTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePokemonFromTeam($pokemonId: Int!) {\n    removePokemonFromTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\n  mutation RemovePokemonFromTeam($pokemonId: Int!) {\n    removePokemonFromTeam(pokemonId: $pokemonId) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePokemonFromTeamByName($pokemonName: String!) {\n    removePokemonFromTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\n  mutation RemovePokemonFromTeamByName($pokemonName: String!) {\n    removePokemonFromTeamByName(pokemonName: $pokemonName) {\n        id\n        name\n        pokemons{\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllTeams {\n    findAllTeams {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindAllTeams {\n    findAllTeams {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindTeamById($id: ID!) {\n    findTeamById(id: $id) {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindTeamById($id: ID!) {\n    findTeamById(id: $id) {\n      id\n      name\n      trainer {\n        id\n        name\n      }\n      pokemons {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      name\n      email\n      team {\n        id\n        name\n        pokemons{\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      name\n      email\n      team {\n        id\n        name\n        pokemons{\n          id\n          name\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;