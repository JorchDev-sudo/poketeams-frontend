import type { CodegenConfig } from '@graphql-codegen/cli'
//TODO cambiar la url del schema a un archivo .env

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'documentNode'
      }
    }
  }
}

export default config