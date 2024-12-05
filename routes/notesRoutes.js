import express from 'express'
const route = express.Router();

route.get('/notes', (req, res) => {
   res.send("hello user")
});

route.get('/notes/:id',(req,res) =>{
    res.send("hello user one note")
})

route.post('/notes',(req,res)=>{
    res.send("hello user add note")
})

route.delete('/notes/:id', (req, res) => {
    res.send("hello user delete note")
});
route.put('/notes/:id', (req, res) =>{
    res.send("hello simane")
});

module.exports = route;