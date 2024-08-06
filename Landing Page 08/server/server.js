const express = require('express');
const cors = require('cors');
const commentRoutes = require("./routes/comments")
const importDataRoute = require("./routes/initialData")
const dummyAuthUser = require("./routes/dummyAuthUser")
const repliesRoute = require("./routes/replies")

const app = express()

// Use CORS middleware
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/import-data', importDataRoute);
app.use('/api/user-comments',commentRoutes, repliesRoute);
app.use('/api/auth-user', dummyAuthUser);


const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})