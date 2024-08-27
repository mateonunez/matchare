module.exports = function matchare (actual, expected) {
  if (typeof actual === 'string' && typeof expected === 'string') {
    const patterns = expected.trim().split(/\r?\n/).map(function trimLine (line) {
      return line.trim()
    })

    let lastIndex = -1
    for (const pattern of patterns) {
      const index = actual.indexOf(pattern)
      if (index === -1 || index < lastIndex) {
        return false
      }
      lastIndex = index
    }
    return true
  }

  for (const key in expected) {
    if (key in actual) {
      if (typeof expected[key] === 'object' && expected[key] !== null) {
        if (!matchare(actual[key], expected[key])) {
          return false
        }
      } else {
        if (actual[key] !== expected[key]) {
          return false
        }
      }
    } else {
      return false
    }
  }
  return true
}
