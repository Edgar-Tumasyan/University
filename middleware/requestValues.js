const reqValues = async (req, res, next) => {
  req.values = {};

  for (const key in req.body) {
    req.values[`${key}`] = req.body[key];
  }

  next();
};

module.exports = reqValues;
