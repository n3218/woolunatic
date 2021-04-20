import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { sendMailToResetPasswordEmail } from "../mailer/sendMailToResetPassword.js"
import { sendMailWithResetPasswordConfirmation } from "../mailer/sendMailWithResetPasswordConfirmation.js"

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      storecredit: user.storecredit,
      address: user.address,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  } else {
    const user = await User.create({
      name,
      email,
      password
    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        storecredit: user.storecredit,
        address: user.address,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      storecredit: user.storecredit,
      address: user.address
    })
  } else {
    res.status(401)
    throw new Error("User not found")
  }
})

// @desc Urdate user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: user.phone,
      address: user.address,
      isAdmin: updatedUser.isAdmin,
      storecredit: updatedUser.storecredit,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(401)
    throw new Error("User not found")
  }
})

// @desc   get All users
// @route  GET /api/users
// @access Private/+Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc   delete User
// @route  DETELE /api/users/:id
// @access Private/+Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await User.deleteOne({ _id: req.params.id })
    res.json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc   Get User By Id
// @route  GET /api/users/:id
// @access Private/+Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc Urdate any user by Admin
// @route PUT /api/users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.storecredit = req.body.storecredit || user.storecredit
    user.address = req.body.address || user.address
    if (req.body.isAdmin === false) {
      user.isAdmin = req.body.isAdmin
    } else {
      user.isAdmin = req.body.isAdmin || user.isAdmin
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
      storecredit: updatedUser.storecredit
    })
  } else {
    res.status(401)
    throw new Error("User not found")
  }
})

// @desc send Link To Reset Password
// @route POST /api/users/forgotpassword
// @access Public
export const sendLinkToResetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    const payload = {
      _id: userExists._id,
      email: userExists.email
    }
    const secret = userExists.password + "-" + userExists.createdAt.getTime()
    const token = jwt.sign(payload, secret, { expiresIn: 3600 })
    await sendMailToResetPasswordEmail({ id: payload._id, email: payload.email, token }).catch(err => console.error("Error on sendMailToResetPasswordEmail: ", err))
    res.status(201).send("Email with reset password link was sent.")
  } else {
    res.status(400)
    throw new Error("Email address does not exist in our system.")
  }
})

// @desc Reset Password
// @route POST /api/users/resetpassword/:userId/:token
// @access Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token } = req.params
  const { password } = req.body
  const userExists = await User.findById(userId)
  if (userExists) {
    const secret = userExists.password + "-" + userExists.createdAt.getTime()
    const payload = jwt.decode(token, secret)
    if (payload._id === userId) {
      userExists.password = password
      const updatedUser = await userExists.save()
      if (updatedUser) {
        await sendMailWithResetPasswordConfirmation({ email: payload.email }).catch(err => console.error("Error on sendMailWithResetPasswordConfirmation: ", err))
        console.log("Password was successfully reseted.")
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          isAdmin: updatedUser.isAdmin,
          storecredit: updatedUser.storecredit,
          token: generateToken(updatedUser._id)
        })
      }
    }
  } else {
    res.status(400)
    throw new Error("Email address is missing.")
  }
})
