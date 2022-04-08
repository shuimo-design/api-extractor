import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include:['test/**/**.test.ts']
    // include:['test/parseFile.test.ts']
    // include: ['test/extractor/**/**.test.ts']
  },
})


