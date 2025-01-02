module.exports.responseSuccess = (data, message = "Success") => {
  return {
    success: true,
    message: message,
    data: data,
  };
};

module.exports.responseError = (message, errors = []) => ({
  success: false,
  message,
  errors,
});
