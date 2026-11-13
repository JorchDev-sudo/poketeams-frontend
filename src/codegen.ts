import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    'src/graphql/generated/': {
      schema: './src/schema/gateway.graphqls',
      documents: ['src/graphql/**/*.ts', '!src/graphql/generated/**'],
      preset: 'client',
      config: { documentMode: 'documentNode', scalars: { ID: 'string' } },
    },
    'src/features/chat/graphql/generated/': {
      schema: './src/schema/chat.graphqls',
      documents: ['src/features/chat/graphql/*.ts', '!src/features/chat/graphql/generated/**'],
      preset: 'client',
      config: { documentMode: 'documentNode', scalars: { ID: 'string', DateTime: 'string' } },
    },
  },
}
export default config