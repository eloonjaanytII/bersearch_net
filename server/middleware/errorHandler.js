
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.json({ error: "error smth" })
}

module.exports = {errorHandler};
