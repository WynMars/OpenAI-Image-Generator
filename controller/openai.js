require("dotenv").config();
const OpenAIimage = require("../models/OpenAI");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);




exports.image = async (req, res) => {
  console.log("OpenAI Image Post");
  const { textInput } = req.body;

  try {
    const response = await openai.createImage({
      prompt: textInput,
      n: 1,
      size: "256x256",
    });

    ////Save to MongoDB
    // const newImg = await new OpenAIimage({
    //   prompt: req.body.prompt,
    //   image_url: image_url
    // })

    // const imageGenerator = await newImg.save()

    if (response.data) {
      if (response.data.data[0].url) {
        return res.status(200).json(response.data.data[0].url);
      }
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

//chatbot
exports.chatbot = async (req, res) => {
  console.log("OpenAI Chatbot Post");

  const { textInput } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: textInput }],
    });
    console.log(completion.data.choices[0].message);

    if (completion.data) {
      if (completion.data.choices[0].message.content) {
        return res.status(200).json(completion.data.choices[0].message.content);
      }
    }

  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// router.get('/', (req, res) => res.send('OpenAI Page'))

// router.get("/", async (req, res) => {
//   try {
//     console.log("OpenAI Get Request");
//     const posts = await OpenAIimage.find();
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });
