const express = require("express");
const router = express.Router();
// const OpenAIimage = require("../../models/OpenAI");

const {image, chatbot} = require('../../controller/openai')

router.route('/image').post(image)
router.route("/chatbot").post(chatbot);


// router.post("/image", async (req, res) => {


module.exports = router;
