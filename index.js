const express = require('express')
const app = express()

const fs = require('fs')
const path = require('path')

const Webcam = require('node-webcam')

const webcam = Webcam.create({
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  callbackReturn: "location",
  verbose: false
})

app.get("/capture.jpg", (req, res) => {
  webcam.capture(`tmp/${Date.now()}`, (err, location) => {
    res.sendFile(path.join(__dirname, location), () => {
      fs.unlink(path.join(__dirname, location), () => { })
    })
  })
})

app.listen(process.env.PORT || 3000)