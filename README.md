# matchare

## Overview

The `matchare` library provides a simple way to compare objects, arrays, strings, and more in JavaScript. It allows you to determine whether two values meet certain conditions, such as string condition or deep object comparisons.

## Install

To install the library, use npm:

```bash
npm i matchare --save-dev
```

## Usage

### Object Matching

The `matchare` function can be used to compare two objects to determine if the `actual` object contains all the properties and values of the `expected` object.

#### Matching Objects

```javascript
import { matchare } from 'matchare'; // or const { matchare } = require('matchare');

const actual = { a: 1, b: 2 };
const expected = { a: 1 };

matchare(actual, expected); // This will return true
```

#### Mismatching Objects (falsy)

```javascript
import { matchare } from 'matchare';

const actual = { a: 1, b: 2 };
const expected = { a: 2 };

matchare(actual, expected); // This will return false
```

### String Matching

`matchare` also supports string comparison. When both `actual` and `expected` are strings, it checks that all lines of `expected` appear in `actual` in the same order.

#### Matching Strings

```javascript
import { matchare } from 'matchare';

const actual = 'The quick brown fox jumps over the lazy dog';
const expected = 'quick\nlazy';

matchare(actual, expected); // This will return true because 'quick' appears before 'lazy'
```

#### Mismatching Strings (falsy)

```javascript
import { matchare } from 'matchare';

const actual = 'The quick brown fox jumps over the lazy dog';
const expected = 'lazy\nquick';

matchare(actual, expected); // This will return false because 'lazy' does not appear before 'quick'
```

### Deep Object Matching

You can perform a deep comparison of nested objects.

#### Deep Matching

```javascript
import { matchare } from 'matchare';

const actual = {
  a: 1,
  b: {
    c: 3,
    d: 4
  }
};
const expected = {
  b: {
    c: 3
  }
};

matchare(actual, expected); // This will return true
```

### String Literal Matching

The library also supports string literal matching, where two strings are compared for equality.

#### Pattern Matching with String Literals

```javascript
import { matchare } from 'matchare';

const actual = `
  {
    "name": "John Doe",
    "age": 30
  }
`;

const expected = `
  {
    "name": "John Doe",
    "age": 30
  }
`;

matchare(actual, expected); // This will return true because the two strings are equal
```

## License

[MIT](LICENSE)
