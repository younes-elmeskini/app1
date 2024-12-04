import express from 'express'
require('dotenv').config();
app.use(express.json());

import notesRouter from "routes/notes";
app.use("/notes", notesRouter);

// Start the server and listen on a specified port
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

