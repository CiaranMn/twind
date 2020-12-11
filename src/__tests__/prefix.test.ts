import type { Instance, Injector } from '../types'

import { create, virtualInjector, strict } from '..'

let injector: Injector<string[]>
let instance: Instance

beforeEach(() => {
  injector = virtualInjector()
  instance = create({
    injector,
    mode: strict,
    preflight: false,
    plugins: {
      'scroll-snap': (parts) => {
        return { 'scroll-snap-type': parts[0] }
      },
    },
  })
})

test('add prefix', () => {
  expect(instance.tw('sticky scroll-snap-x appearance-menulist-button')).toBe(
    'sticky scroll-snap-x appearance-menulist-button',
  )
  expect(injector.target).toMatchObject([
    '.sticky{position:-webkit-sticky, sticky}',
    '.appearance-menulist-button{appearance:menulist-button;-moz-appearance:menulist-button;-webkit-appearance:menulist-button}',
    '.scroll-snap-x{scroll-snap-type:x;-ms-scroll-snap-type:x;-webkit-scroll-snap-type:x}',
  ])
})
