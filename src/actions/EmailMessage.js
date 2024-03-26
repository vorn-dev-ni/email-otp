import OTP from "../model/OTP.js";



export const messageEmailExist = async (email) => {
  const result = await OTP.findOne({ email: email });

  if (result?.email) {
    return true;
  }

  return false;
};
