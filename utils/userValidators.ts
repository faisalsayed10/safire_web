import { EditUserDetails, Error, LoginData, SignupData } from "./types";

const isEmail = (email: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (str: string) => {
  if (str.trim() === "") return true;
  else return false;
};

const hasWhiteSpace = (str: string) => {
  return /\s/g.test(str);
};

export const validateSignupData = (data: SignupData) => {
  let errors: Error = {};

  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Password must not be empty";

  if (data.password.length < 8) errors.password = "Password is too short";

  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match, try again!";

  if (isEmpty(data.username)) errors.username = "Username must not be empty";
  if (hasWhiteSpace(data.username))
    errors.username = "Username cannot contain a whitespace";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateLoginData = (data: LoginData) => {
  let errors: Error = {};

  if (isEmpty(data.email)) errors.email = "Email must not be empty";
  if (isEmpty(data.password)) errors.password = "Password must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const reduceUserDetails = (data: EditUserDetails) => {
  let userDetails: EditUserDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;
  if (!isEmpty(data.firstName.trim())) userDetails.firstName = data.firstName;
  if (!isEmpty(data.lastName.trim())) userDetails.lastName = data.lastName;

  return userDetails;
};