const express = require('express');
const commentRoutes = require("./routes/comments")
const importDataRoute = require("./routes/initialData")

const app = express()

app.use(importDataRoute)
app.use(commentRoutes)

const PORT = process.env.port || 6000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})