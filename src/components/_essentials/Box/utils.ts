type Cond = (data: any) => boolean

export const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)

export const cond = (conditions: Cond, fn: (data: any) => typeof data) => (data: any) => {
  if (conditions(data)) return fn(data)
  return data
}

export const append = (property: string) => (css: string) => `${css}${property};`
export const exists = (prop: any) => () => !!prop
