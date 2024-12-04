import express from 'express'
const route = express();


route.use(express.json());


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