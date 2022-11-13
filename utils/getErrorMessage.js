const getErrorMessage = (code, message) => {
  return {
    status: 'error',
    code,
    message,
  };
};

module.exports = getErrorMessage;
