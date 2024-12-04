import express from 'express'
const app = express();


app.use(express.json());


app.get('/notes', (req, res) => {
   res.send("hello user")
});

app.get('/notes/:id',(req,res) =>{
    res.send("hello user one note")
})

app.post('/notes',(req,res)=>{
    res.send("hello user add note")
})

app.delete('/notes/:id', (req, res) => {
    res.send("hello user delete note")
});
app.put('/notes/:id', (req, res) =>{
    res.send("hello simane")
});
// Start the server and listen on a specified port
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
