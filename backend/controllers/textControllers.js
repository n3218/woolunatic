import asyncHandler from "express-async-handler"
import Text from "../models/textModel.js"
import fs from "fs"

// @desc   Fetch all Texts
// @route  GET /api/texts
// @access Public
export const getTexts = asyncHandler(async (req, res) => {
  const texts = await Text.find({}).sort([["sort", 1]])
  console.log("getTexts: texts", texts)
  res.json(texts)
})

// @desc   Fetch single Text
// @route  GET /api/texts/:id
// @access Public
export const getTextById = asyncHandler(async (req, res) => {
  console.log("getTextById: req.params.id: ", req.params.id)
  const text = await Text.findById(req.params.id)
  console.log("getTextById: text: ", text)

  if (text) {
    res.status(201).json(text)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc   Fetch single Text by url
// @route  GET /api/texts/url/:url
// @access Public
export const getTextByUrl = asyncHandler(async (req, res) => {
  console.log("getTextByUrl: req.params.url: ", req.params.url)
  const text = await Text.findOne({ url: req.params.url })
  console.log("getTextByUrl: text: ", text)

  if (text) {
    res.status(201).json(text)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc   Create a Text
// @route  POST /api/texts
// @access Private/+Admin
export const createText = asyncHandler(async (req, res) => {
  console.log("createText")
  const text = new Text({
    title: "New title",
    url: "New url",
    description: "",
    sort: 0,
    hide: false,
    image: [],
    user: req.user
  })
  try {
    const createdText = await text.save()
    res.status(201).json(createdText)
  } catch (err) {
    console.log("Error on creating text: ", err)
  }
})

// @desc   Update a Text
// @route  PUT /api/texts/:id
// @access Private/+Admin
export const updateText = asyncHandler(async (req, res) => {
  console.log("updateText")
  const { title, url, description, image, sort, hide, user } = req.body
  const text = await Text.findById(req.params.id)
  console.log("updateText: text: ")
  if (text) {
    text.title = title
    text.url = url
    text.description = description
    text.sort = sort
    text.hide = hide
    text.image = image
    text.user = user
    try {
      const updatedText = await text.save()
      res.status(201).json(updatedText)
    } catch (err) {
      res.status(404)
      throw new Error("Problem on updating Text: ", err)
    }
  }
})

// @desc   Delete a Text
// @route  DELETE /api/texts/:id
// @access Private/+Admin
export const deleteText = asyncHandler(async (req, res) => {
  const text = await Text.findById(req.params.id)
  if (text) {
    try {
      await text.remove()
      console.log({ message: `Text was successfully deleted.` })
      res.json({ message: `Text was successfully deleted.` })
    } catch (err) {
      res.status(404)
      throw new Error("Problem with deleting Text", err)
    }
  } else {
    res.status(404)
    throw new Error("Text not found")
  }
})
