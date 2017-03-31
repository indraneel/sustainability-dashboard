const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

// serve static assets normally
app.use("/", express.static(__dirname + '/build/'))
app.use("/static", express.static(__dirname + '/build/static'))
app.use("/landing/css", express.static(__dirname + '/build/landing/css'))
app.use("/landing/font-awesome", express.static(__dirname + '/build/landing/font-awesome'))
app.use("/landing/fonts", express.static(__dirname + '/build/landing/fonts'))
app.use("/landing/img", express.static(__dirname + '/build/landing/img'))
app.use("/landing/js", express.static(__dirname + '/build/landing/js'))

app.get('/landing', function(request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'landing', 'index.html'))
})
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('/app*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
