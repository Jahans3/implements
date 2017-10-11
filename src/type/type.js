import { IMPLEMENTS_TYPES} from "../constants"
import { invalidTypeError, invalidArrayElementError, invalidShapeError } from "../errors"

const validTypes = ['number', 'object', 'string', 'symbol', 'function', 'boolean', 'array']

const isValidType = ({ type }) => {
  const validType = validTypes.find(t => t === type)

  if (validType) {
    return validType
  }

  return false
}

const typeObject = ({ type, array = false, Interface = false }) => ({
  type,
  array,
  Interface,
  [IMPLEMENTS_TYPES.TYPE]: true
})

export default (type, shape) => {
  const validType = isValidType({ type })

  if (!validType) {
    return invalidTypeError.throw({ type })
  }

  if (validType && !shape) {
    return typeObject({ type })
  }

  if (validType === 'array') {
    const invalidElement = Array.isArray(shape) && shape.find(t => (!t[IMPLEMENTS_TYPES.TYPE] && !t[IMPLEMENTS_TYPES.INTERFACE]))

    if (invalidElement) {
      invalidArrayElementError.throw()
    }

    return typeObject({ type, array: shape })
  }

  if (validType === 'object') {
    const isInterface = shape[IMPLEMENTS_TYPES.INTERFACE]

    if (!isInterface) {
      invalidShapeError.throw()
    }

    return typeObject({ type, shape })
  }
}