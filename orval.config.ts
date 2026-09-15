import { defineConfig } from 'orval';

export default defineConfig({
  lifeOs: {
    input: {
      target: './api/openapi.json',
    },
    output: {
      target: './src/shared/api/generated',
      schemas: './src/shared/api/generated/model',
      client: 'fetch',
      mode: 'tags-split',
      clean: true,
      prettier: false,
      override: {
        mutator: {
          path: './src/shared/api/http-client.ts',
          name: 'customFetch',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
    },
  },
});
