import express, { json } from 'express'

const app = express();

app.use(json());

app.post('/auth/login', function (req, res) {
  console.log(req.body);
  res.json({
    success: true
  })
})

app.listen(4444, (err) => {
    
    if (err) {
        return console.log(err);
    }

    console.log('Server OK!');
})