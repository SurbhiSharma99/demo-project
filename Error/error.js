const NOT_FOUND = {
    code: 'USREG4401',
    message: 'Data not found.',
    errorMessage: 'User details not found'
  };
  
  const INVALID_VALUE= {
    code: 'USREG4402',
    message: 'Invalid Value',
    errorMessage: 'Invalid value passed in the request parameter:'
  };

  const EMAIL_PHONENO_ERROR = {
    code: 'USREG4403',
    message: 'Existing User',
    errorMessage: 'User with email/phoneNumber already Exist',
  };

  const DATABASE_ERROR = {
    code: 'USREG5501',
    message: 'Database Error',
    errorMessage: 'Database Error',
  };

  const USERNAME_ERROR = {
    code: 'USREG4404',
    message: 'Existing User',
    errorMessage: 'User Name  already Exist',
  };

  const INVALID_PARAM = {
    code: 'USREG4404',
    message: 'Invalid Request Param Passed',
    errorMessage: 'Invalid parameter passed in the request:'
  };


  module.exports = {
    NOT_FOUND,
    INVALID_VALUE,
    USERNAME_ERROR,
    DATABASE_ERROR,
    EMAIL_PHONENO_ERROR,
    INVALID_PARAM
    
  };


  