const successReturn = (res, data, rtStatus = 200) => {
  return res.status(rtStatus).json({
    error: false,
    data,
  });
};

module.exports = successReturn;
