// @desc Logs request to console
const logger = (req, res, next) => {
  // below line logs method type and URL route
  // note that I am accessing info from request (req) object
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next(); // this makes express move to next middleware... otherwise it will be stuck here.
};

module.exports = logger;
