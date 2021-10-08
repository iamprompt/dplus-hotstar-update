export const isObjectEqual = (
  x: { [key: string]: any },
  y: { [key: string]: any },
  watchedField: string[] = []
): [boolean, string[]] => {
  const diffKey: string[] = []

  for (const [k, v] of Object.entries(y)) {
    if (!watchedField.includes(k)) continue
    if (Array.isArray(v)) {
      if (x[k].sort().join(' ') != v.sort().join(' ')) {
        diffKey.push(k)
      }
    } else {
      if (x[k] instanceof Date) {
        if (x[k].valueOf() !== v.valueOf()) diffKey.push(k)
      } else if (x[k] != v) {
        diffKey.push(k)
      }
    }
  }

  return [diffKey.length === 0, diffKey]
}

export const onlyUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index
}
