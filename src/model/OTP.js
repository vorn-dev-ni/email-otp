import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  codes: {
    type: Number,
    lowercase: true,
    trim: true,
    default: () => {
      const randomDigit = [];
      for (let i = 0; i <= 5; i++) {
        const randomNumber = Math.floor(Math.random() * 9);
        randomDigit.push(randomNumber.toString());
      }
      console.log(randomDigit);
      const [a, b, c, d, e] = randomDigit;
      return Number(a + b  + c + d + e);
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    index: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  createdDated: {
    type: Date,
    default: Date.now,
  },
});

const OTP = mongoose.model("otp", otpSchema);
export default OTP;
