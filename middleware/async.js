// This asyncHandler takes a function as argument
// and runs that function... but internally handles error.

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
