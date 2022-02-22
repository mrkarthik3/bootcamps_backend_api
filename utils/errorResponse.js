class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;

// This class extends the Error class and takes message and statusCode
// as arguments to instantiate an object of ErrorResponse class
// The Error parent class has its own message property, but I am passing my own message
// into it using super(message)
// Then created a new property 'statusCode' and passed in the value from the argument
