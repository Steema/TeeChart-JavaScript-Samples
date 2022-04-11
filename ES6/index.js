const express = require("express")

var app = express()

app.use(express.static('demos'))
app.use('/src', express.static('src'))

app.listen(10000, () => {
console.log("Started application on http://localhost:%d", 10000)
});
