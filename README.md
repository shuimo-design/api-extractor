# @janghood/doc-extractor

A simple api extractor for code. based on [tsdoc](https://tsdoc.org/).

## warn

according to inline tags definition, the following code is not valid:

```ts
/**
 * @type { file:string, directory:string }
 * @default {}
 * @default (id:number) => void
 */
```
