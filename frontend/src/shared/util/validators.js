const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_NUMBER = "NUMBER";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_NUMBER = () => ({ type: VALIDATOR_TYPE_NUMBER });

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
  }
  return isValid;
};
