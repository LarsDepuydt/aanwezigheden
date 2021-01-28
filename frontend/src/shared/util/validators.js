const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_NUMBER = "NUMBER";
const VALIDATOR_TYPE_MINLENGTH = "MINNUMBER";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_NUMBER = () => ({ type: VALIDATOR_TYPE_NUMBER });
export const VALIDATOR_MINLENGTH = (value) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  minLength: value,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      if (value === undefined) {
        isValid = false;
      } else {
        isValid = isValid && value.trim().length > 0;
      }
    }
    if (validator.type === VALIDATOR_TYPE_NUMBER) {
      isValid = isValid && !isNaN(value);
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.minLength;
    }
  }
  return isValid;
};
