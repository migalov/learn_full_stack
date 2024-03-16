import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hi, man!</h1>');
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK!');
})