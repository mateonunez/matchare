import { describe, test } from 'node:test'
import { tspl } from '@matteo.collina/tspl'
import { matchare } from '../matchare.js'

test('simple match', async (t) => {
  const { ok } = tspl(t, { plan: 1 })
  ok(matchare({ a: 1, b: 2 }, { a: 1 }))
})

test('complex match', async (t) => {
  const { ok } = tspl(t, { plan: 1 })
  ok(matchare({ a: 1, b: { c: 2 }, d: {} }, { a: 1, b: { c: 2 } }))
})

test('complex match with null', async (t) => {
  const { ok } = tspl(t, { plan: 1 })
  ok(matchare({ a: 1, b: { c: 2 }, d: null }, { a: 1, b: { c: 2 } }))
})

test('should not match', async (t) => {
  const { equal } = tspl(t, { plan: 1 })
  equal(matchare({ a: 1, b: 2 }, { a: 2 }), false)
})

test('should not match with null', async (t) => {
  const { equal } = tspl(t, { plan: 1 })
  equal(matchare({ a: 1, b: null }, { a: 2 }), false)
})

test('should not match with undefined', async (t) => {
  const { equal } = tspl(t, { plan: 1 })
  equal(matchare({ a: 1, b: undefined }, { a: 2 }), false)
})

test('should return false for non-existing key', (t) => {
  const { equal } = tspl(t, { plan: 1 })
  const actual = { a: 1, b: 2 }
  const expected = { a: 1, b: 2, c: 3 }
  equal(matchare(actual, expected), false)
})

test('should return false for mismatching values', (t) => {
  const { equal } = tspl(t, { plan: 1 })
  equal(matchare({ a: 1, b: 2 }, { a: 1, c: 3 }), false)
})

describe('strings', async (t) => {
  test('should fail on string pattern match', async (t) => {
    const { equal } = tspl(t, { plan: 1 })
    const actual = { a: 'hello world', b: 2 }
    const expected = { a: 'world.*' }
    const result = matchare(actual, expected)

    equal(result, false)
  })

  test('should fail on multi-line string pattern match', async (t) => {
    const { equal } = tspl(t, { plan: 1 })
    const actual = `
      function example() {
        console.log('Hello, world!');
        return false;
      }
    `
    const expected = `
      console.log('Goodbye, world!');
      return true;
    `
    const result = matchare(actual, expected)

    equal(result, false)
  })

  test('should pass on multi-line string pattern match', async (t) => {
    const { ok } = tspl(t, { plan: 1 })
    const actual = `
      function example() {
        console.log('Hello, world!');
        return true;
      }
    `
    const expected = `
      console.log('Hello, world!');
      return true;
    `
    const result = matchare(actual, expected)

    ok(result)
  })
})

describe('arrays', async (t) => {
  test('match arrays', async (t) => {
    const { ok } = tspl(t, { plan: 1 })
    const actual = [{ a: 1 }, { b: 2 }]
    const expected = [{ a: 1 }, { b: 2 }]
    const result = matchare(actual, expected)

    ok(result)
  })

  test('do no match arrays', (t) => {
    const { equal } = tspl(t, { plan: 1 })
    const actual = [{ a: 1 }, { b: 2 }]
    const expected = [{ a: 1 }, { b: 3 }]
    const result = matchare(actual, expected)

    equal(result, false)
  })

  test('should fail on array pattern match', async (t) => {
    const { equal } = tspl(t, { plan: 1 })
    const actual = { a: 1, b: 2 }
    const expected = [{ a: 1 }, { b: 2 }]
    const result = matchare(actual, expected)

    equal(result, false)
  })
})
