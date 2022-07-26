const { codes } = require("./db");

exports.handleError = (error) => {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
        return {
            code: codes.CLIENT_ERROR_CODE_400, 
            message: "username or email already taken"
        }
    } else {
        return {
            code: codes.SERVER_ERROR_CODE,
            message: codes.SERVER_ERROR_MESSAGE
        }
    }
};