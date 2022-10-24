const getErrorMessage = (code, id) => {
  return {
    status: 'error',
    code,
    message: `Contact with id=${id} not found`,
  };
};

module.exports = getErrorMessage;
