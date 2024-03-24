import express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`Your server is running on PORT : ${port}`);
});
