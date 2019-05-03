const app = require('http').createServer()
const io = require('socket.io')(app)

let PORT = 3000

app.listen(PORT)

let messageLog = [{ role: 'other', message: 'hello guys~' }, { role: 'myself', message: 'hi~ what can I help you ?' }]

io.on('connection', socket => {
  io.emit('enter', '连接成功')
  io.emit('init', messageLog)
  socket.on('message', data => {
    messageLog.push(data)

    io.emit('message', data)
  })
  socket.on('disconnect', () => {
    io.emit('leave', '断开连接')
  })
})
