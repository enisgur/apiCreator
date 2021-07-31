const serverError = (res, msg, errMsg = null) => {
  return res
    .status(500)
    .json({ error: true, errorMsg: "Server Error !", msg, codeError: errMsg });
};

module.exports = serverError;
