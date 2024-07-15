const express = require('express');
const commentRoutes = require("./routes/comments")
const importDataRoute = require("./routes/initialData")
const dummyAuthuser = require("./routes/dummyAuthUser")

const app = express()

app.use('/api/import-data', importDataRoute);
app.use('/api/comments', commentRoutes);
app.use('/api/auth-user', dummyAuthuser);
const PORT = process.env.port || 6000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})