import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
    .connect('mongodb://127.0.0.1:27017', {
        dbName: "backendapi",
    })
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", schema);

app.get("/", (req, res) => {
    res.send("Nice Working.");
});

app.get("/users/all", async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users: [],
    });
});

app.post("/users/new", async (req, res) => {
    await User.create({
        name: "Tushar",
        email: "s2sharpit@gmail.com",
        password: "s2sharpit",
    });

    res.json({
        success: true,
        message: "Registered Successfully",
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});