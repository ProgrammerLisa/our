<template>
  <div>
    <div class="chat-room">
      <div class="chat-box" :style="i.boxStyle" v-for="(i ,index) in chatRoom" :key="index">
        <div class="chat-avater">
          <el-button :type="i.type" icon="el-icon-s-custom" circle></el-button>
        </div>
        <div class="chat-message">
          <span>{{i.message}}</span>
        </div>
      </div>
    </div>
    <el-row :gutter="20" class="send-box">
      <el-col :span="18"><el-input v-model="content"></el-input></el-col>
      <el-col :span="6"><el-button @click="sendMessage">发送</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      content: null,
      connectionUrl: 'ws://localhost:3000',
      chatRoom: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const _this = this
      this.socket = io.connect(_this.connectionUrl)
      _this.socket.on('enter', data => {
        Message.success(data)
        _this.socket.on('init', datas => {
          _this.chatRoom = []
          datas.forEach(item => {
            item = _this.qsJson(item)
          })
          this.chatRoom = datas
        })
      })
      _this.socket.on('message', data => {
        let qsData = _this.qsJson(data)
        _this.chatRoom.push(qsData)

      })
      _this.socket.on('leave', data => {
        Message.error(data)
      })
    },
    qsJson (data) {
      if (data.role === 'myself') {
        data.type = 'success'
        data.boxStyle = 'flex-direction: row-reverse'
      } else {
        data.type = 'primary'
        data.boxStyle = 'flex-direction: row'
      }
      return data
    },
    sendMessage () {
      if (this.content) {
        this.socket.emit('message', { role: 'myself', message: this.content })
        this.content = null
      }
    }
  },
  // 销毁组件前退出socket
  beforeDestroy (){
    this.socket.disconnect()
  },
}
</script>
<style lang="less" scoped>
  .chat-room {
    width: 100%;
    height: calc(100vh - 120px);
    overflow-y: auto;
    .chat-box {
      padding: 8px 15px;
      display: flex;
      .chat-message {
        background: #fff;
        padding: 10px;
        margin: 0 10px;
        max-width: 80%;
        border-radius: 3px;
        border: 1px solid #eee;
        word-wrap: break-word;
      }
    }
  }
  .send-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #eee;
    background: #fff;
    margin: 0 !important;
  }
</style>
