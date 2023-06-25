/* The IdError class extends the Error class and adds a custom name for identifying errors related to
IDs. */
export class IdError extends Error {
  constructor (message: string | undefined) {
    super(message)
    this.name = 'IdError'
  }
}

/* The class `NotFound` extends the `Error` class and represents an error for when a resource is not
found. */
export class NotFound extends Error {
  constructor (message: string | undefined) {
    super(message)
    this.name = 'NotFound'
  }
}
