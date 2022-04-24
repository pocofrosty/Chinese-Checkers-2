// eslint-disable-next-line no-undef
const Hex = require('./Hex')

class HexUtil {
  static DIRECTIONS = [
    new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
    new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
  ]

  static convertHexToTuple(hex) {
    return `(${hex.q},${hex.r},${hex.s})`
  }

  static convertTupleToHex(tuple) {
    const q = tuple.substring(tuple.indexOf('(') + 1, tuple.indexOf(','))
    const r = tuple.substring(tuple.indexOf(',') + 1, tuple.lastIndexOf(','))
    return new Hex(parseInt(q, 10), parseInt(r, 10), -parseInt(q, 10) - parseInt(r, 10))
  }

  static add(a, b) {
    return new Hex(a.q + b.q, a.r + b.r, a.s + b.s)
  }

  static equals(a, b) {
    return a.q == b.q && a.r == b.r && a.s == b.s
  }

  static adjacentHexes(tuple) {
    const { q, r, s } = this.convertTupleToHex(tuple)
    const center = new Hex(q, r, s)
    const adjacentHexes = []
    for (let i = 0; i < 6; i++) {
      const adjacentHex = this.add(center, this.DIRECTIONS[i])
      adjacentHexes.push(adjacentHex)
    }
    return adjacentHexes
  }

  // tuple inputs
  static isAdjacentHex(a, b) {
    const adjacentHexes = this.adjacentHexes(a)
    const hexB = this.convertTupleToHex(b)
    for (const hex of adjacentHexes)
    {
      console.log(hex)
      if (this.equals(hex, hexB)) {return true}
    }
    return false
  }
}

module.exports = HexUtil
