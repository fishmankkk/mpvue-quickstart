var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')
// var opn = require('opn')
var port = 8089
var app = express()

// Use the default path '/' (Not recommended)
// app.use(mockjs(path.join(__dirname, 'mocks')))

// Use a custom path '/api'
app.use('/api', mockjs(path.join(__dirname, '../mocks')))

// Here you can add any code.
console.log(`正在监听${port}端口`)
app.listen(port)
