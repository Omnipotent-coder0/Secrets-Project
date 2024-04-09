export const userValidationSchema = {
    username : {
        notEmpty : {
            errorMessage : "Username cannot be Empty!",
        },
        isEmail : {
            errorMessage : "Username must be an Email!",
        }
    },
    password : {
        notEmpty :{
            errorMessage : "Password cannot be Empty!",
        },
        isLength : {
            options : {
                max : 12,
            },
            errorMessage : "Password must be less than or equals to 12 charactes!",
        },
        isString : {
          errorMessage : "Password must be a string!",
        },
    },
    displayName : {
        notEmpty : {
            errorMessage : "Display Name cannot be empty !",
        },
        isLength : {
            options : {
                min : 2,
                max : 15,
            },
            errorMessage : "Display Name should be between 2-15 characters long!",
        }
    }
};

export const secretValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title cannot be Empty!",
    },
    isLength: {
      options: {
        max: 80,
      },
      errorMessage: "Title must be less than 80 characters long!",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "Description cannot be Empty!",
    },
    isLength: {
      options: {
        max: 1000,
      },
      errorMessage: "Decription must be less than 1000 characters long!",
    },
  },
  visibility: {
    notEmpty: {
      errorMessage: "Visibility must be provided!",
    },
    isBoolean: {
      errorMessage: "Visibility must be Boolean i.e, true or false!",
    },
  },
};
