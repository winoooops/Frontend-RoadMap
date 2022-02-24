export let activeEffect = null

export const effect = (eff) => {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}