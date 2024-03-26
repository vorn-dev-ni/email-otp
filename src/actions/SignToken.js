import jwt from "jsonwebtoken";
import util from "util";

export const generateToken = async (email, password) => {
  const token = await jwt.sign(
    {
      email,
      password,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRE_DATE,
    }
  );
  return token;
};
export const verifyToken = async (token, next) => {
  try {
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
    );

    return decoded;
  } catch (error) {
    console.error(error);
    return next("Unauthorize");
  }
};

export const checkHeaderToken = async (req, next) => {
  if (
    !(req.headers.authorization && req.headers.authorization.includes("Bearer"))
  ) {
    return next("Unauthorize");
  }

  //Verify Token
  const oldToken = req.header("authorization").split(" ")[1];
  return oldToken;
};
