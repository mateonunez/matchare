# matchare

Matchare is a simple assertion library for testing in Node.js. It follows the same match pattern as node-tap.

## Install

```bash
npm i matchare --save-dev
```

## Usage

```javascript
import matchare from 'matchare';

const actual = { a: 1, b: 2 };
const expected = { a: 1 };

matchare(actual, expected); // this match will return true
```

---

```javascript
import matchare from 'matchare';

const actual = { a: 1, b: 2 };
const expected = { a: 2 };

matchare(actual, expected); // this match will return false
```

## License

[MIT](LICENSE)
