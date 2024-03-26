import express from "express"
import CodeController from "../controllers/index.js"
export const userCodeRouter = express.Router()

userCodeRouter.post('/generate-otp',CodeController.generateCode)
userCodeRouter.post('/verify-otp',CodeController.verifyCode)