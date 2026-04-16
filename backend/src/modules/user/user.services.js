import bcrypt from "bcryptjs";

export const hash = (password) => bcrypt.hash(password, 10);
export const compare = (enteredPassword, databasePassword) =>
  bcrypt.compare(enteredPassword, databasePassword);
