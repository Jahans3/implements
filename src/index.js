// export { default } from './implement'
// export { default as Interface } from './Interface'
// export { default as type } from './type'
export { IMPLEMENT_TYPES } from './constants'

import type from './type'
import Interface from './Interface'
import implement from './implement'

const Seat = Interface('Seat')({
  colour: type('string'),
  height: type('number')
}, {
  error: true
})

const Car = Interface('Car')({
  colour: type('string'),
  doors: type('number'),
  Seat: type('object', Seat)
}, {
  error: true
})

const ford = {
  colour: 'blue',
  doors: 4,
  wheels: 'alloy',
  Seat: { colour: 'red', height: 2 }
}

const FordCar = implement(Car)(ford)

console.log(FordCar)
