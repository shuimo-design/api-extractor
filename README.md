# @janghood/doc-extractor

A simple api extractor for code. based on [tsdoc](https://tsdoc.org/).

[![codecov](https://codecov.io/gh/janghood/api-extractor/branch/master/graph/badge.svg?token=NU71GX2KFM)](https://codecov.io/gh/janghood/api-extractor)

## warn

according to inline tags definition, the following code is not valid:

```ts
/**
 * @type { file:string, directory:string }
 * @default {}
 * @default (id:number) => void
 */
```
