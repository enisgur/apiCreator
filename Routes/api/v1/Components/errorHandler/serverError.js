// const serverError = (res, msg, errMsg = null, errCode = null) => {
//   return res.status(500).json({
//     error: true,
//     errorTitle: "Server Error !",
//     msg,
//     errorMessage: errMsg,
//     errorCode: errCode,
//   });
// };

const serverError = (res, objError, errMsg = null) => {
  const { msg, code } = objError;

  return res.status(500).json({
    error: true,
    errorTitle: "Server Error !",
    msg,
    errorMessage: errMsg,
    errorCode: code,
  });
};

module.exports = serverError;
