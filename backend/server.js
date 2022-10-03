import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:8080";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.Promise = Promise;



const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to this API");
});



const postSchema = new mongoose.Schema({
  hearts: {
    type: Number,
    default: 0
  },

  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 120,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postId: {
    type: Number
  }
});

const Allmessages = mongoose.model("Allmessages", postSchema);

/* Create a new post*/

app.post("/new", async (req, res) => {
  const { message } = req.body;

  const messages = new Allmessages({
    message
  }).save();

  try {
    const response = await messages;
    if (response) {
      res.status(201).json({
        response,
        success: true
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/* Get all posts*/

app.get("/post", async (req, res) => {
  try {
    const response = await Allmessages.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/* update post if its get a like */

app.post("/post/:postId/like", async (req, res) => {
  const { postId } = req.params;

  try {
    const likeUpdate = await Allmessages.findByIdAndUpdate(
      {
        _id: postId
      },
      {
        $inc: {
          hearts: 1
        }
      },
      {
        new: true
      }
    );

    if (likeUpdate) {
      res.json(likeUpdate);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
