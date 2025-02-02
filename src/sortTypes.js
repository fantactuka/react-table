const reSplitAlphaNumeric = /([0-9]+)/gm

// Mixed sorting is slow, but very inclusive of many edge cases.
// It handles numbers, mixed alphanumeric combinations, and even
// null, undefined, and Infinity
export const alphaNumeric = (a, b) => {
  // Force to strings (or "" for unsupported types)
  a = toString(a)
  b = toString(b)

  // Split on number groups, but keep the delimiter
  // Then remove falsey split values
  a = a.split(reSplitAlphaNumeric).filter(Boolean)
  b = b.split(reSplitAlphaNumeric).filter(Boolean)

  // While
  while (a.length && b.length) {
    let aa = a.shift()
    let bb = b.shift()

    const an = parseInt(aa, 10)
    const bn = parseInt(bb, 10)

    const combo = [an, bn].sort()

    // Both are string
    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1
      }
      if (bb > aa) {
        return -1
      }
      continue
    }

    // One is a string, one is a number
    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1
    }

    // Both are numbers
    if (an > bn) {
      return 1
    }
    if (bn > an) {
      return -1
    }
  }

  return a.length - b.length
}

export function datetime(a, b) {
  a = a.getTime()
  b = b.getTime()
  return numeric(a, b)
}

export function numeric(a, b) {
  return a === b ? 0 : a > b ? 1 : -1
}

// Utils

function toString(a) {
  if (typeof a === 'number') {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return ''
    }
    return String(a)
  }
  if (typeof a === 'string') {
    return a
  }
  return ''
}
