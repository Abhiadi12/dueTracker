export const hasNumber = (value) => {
  return new RegExp(/[0-9]/).test(value);
};
export const hasUpperCase = (value) => {
  return new RegExp(/[A-Z]/).test(value);
};
export const hasSpecial = (value) => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};
export const strengthDecider = (password) => {
  if (/(^\s+)|(\s+$)/.test(password)) return [undefined, undefined, undefined];
  const count = password.length;
  let extraConditionCount = 0;
  if (hasNumber(password)) extraConditionCount++;
  if (hasSpecial(password)) extraConditionCount++;
  if (hasUpperCase(password)) extraConditionCount++;
  switch (true) {
    case count < 2:
      return ["red", "very weak", 20];
    case count < 4:
      return ["orange", "weak", 40];
    case count < 6:
      return ["yellow", "average", 60];
    case count >= 6:
      if (extraConditionCount < 1) return ["yellow", "average", 60];
      else if (extraConditionCount < 3) return ["olive", "strong", 80];
      else return ["green", "very strong", 100];
  }
};
