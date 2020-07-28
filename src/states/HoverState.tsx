import { createStateLink } from '@hookstate/core'

export const HoverState = createStateLink('')

export const setHover = (hover: string) => {
  HoverState.set(hover)
}
