export const isObjectEqual = (
  x: { [key: string]: any },
  y: { [key: string]: any },
  watchedField: string[] = []
): [boolean, string[]] => {
  const diffKey: string[] = []

  for (const [k, v] of Object.entries(y)) {
    if (Array.isArray(v)) {
      if (x[k].sort().join(' ') != v.sort().join(' ') && !watchedField.includes(k)) {
        diffKey.push(k)
      }
    } else {
      if (x[k] != v && !watchedField.includes(k)) {
        diffKey.push(k)
      }
    }
  }

  return [diffKey.length === 0, diffKey]
}

export const onlyUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index
}
