import { messageEmailExist } from "../actions/EmailMessage.js";
import { sendEmail } from "../middleware/NodeMailer.js";
import OTP from "../model/OTP.js";

const generateCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isExist = await messageEmailExist(email);
    if (isExist) {
      await OTP.deleteOne({ email: email });
    }
    const result = await OTP.create({ email });
    //
    await sendEmail({
      email,
      codes: result.codes
    });
    return res.status(200).json({
      message: "An 6 digit code has send to your email please check",
      response: "success",
      email: email,
      status: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email, codes } = req.body;
    const { email: emailOTP, codes: codeOTP } = await OTP.findOne({
      email: email,
    });

    if (
      email?.toLowerCase() === emailOTP &&
      codes?.toString() === codeOTP.toString()
    ) {
      await OTP.deleteOne({ email: email });

      return res.status(200).json({
        message: "Your code is valid",
        response: "success",
        status: 200,
      });
    }
    return res.status(400).json({
      message: "Invalid code please try again",
      response: "failed",
      codes: codes,
      status: 400,
    });
  } catch (error) {
    return next(error);
  }
};

export default { generateCode, verifyCode };
