const jwt = require("jsonwebtoken");

interface User {
  firstName: string;
  lastName: string;
  password: string;
}

const createToken = (user: User) => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET);
};

export { createToken };
