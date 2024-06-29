function generateResponse(status, success, message, data = null) {
  return {
    status: status,
    success: success,
    message: message,
    data: data,
  };
}

module.exports = generateResponse;
