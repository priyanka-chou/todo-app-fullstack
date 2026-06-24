require("dotenv").config();

const express = require("express");   //Express package ko import karta hai
const cors = require("cors");          //CORS package ko import karta hai

const authRoutes =require("./routes/authRoutes");
const todoRoutes =require("./routes/todoRoutes");

const app = express();

app.use(cors());               // React aur backend ke beech requests allow karta hai
app.use(express.json());       // JSON data ko read karne ke liye middleware


app.use("/", authRoutes);
app.use("/",todoRoutes);


app.get("/", (req, res) => {     //GET route banata hai
  res.send("Backend Running");   //Client ko response bhejta hai
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)  //Server ko port 5000 par start karta hai
})