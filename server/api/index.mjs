import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.mjs";
import session from "express-session";
import passport from "passport";
import cors from "cors";

const port = process.env.PORT || 3000;
const db = process.env.DB_URL;
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN,
  // origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET  || "my secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 2,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get("/", (req, res) => {
  return res.status(200).send({ hello: "world" });
});

mongoose
  .connect(db)
  .then(() => {
    console.log("Your application is successfully connected to the database");
    app.listen(port, () => {
      console.log(`Your server is running on PORT : ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
