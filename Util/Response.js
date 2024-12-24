function successResponse(message, data = null) {
    return {
      status: 'Success',
      message,
      data,
      error: [],
    };
  }
  
  function failureResponse(message, [errorCode, errorMessage]) {
    return {
      status: 'Fail',
      message,
      error:  {
        errorCode ,
        errorMessage
      }

    };
  }
  
  module.exports = { successResponse, failureResponse };