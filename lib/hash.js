const hashCode = (str) => {
    return str ? str.split('').reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0) : 0
}

export default hashCode