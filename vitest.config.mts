import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/**.test.ts'],
    coverage: {
      reporter: ['json', 'html'],
    },
    testTimeout: 10000,
  },
});


