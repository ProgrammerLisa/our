<template>
  <div class="u-img-upload">
    <input class="upload-input" type="file" :accept="acceptType" id="fileUpload" @change="fileChange($event)"/>
     <slot></slot>
  </div>
</template>

<script>
import api from '@/utils/request'
import { Message } from 'element-ui'

export default {
  props: {
    type: {
      type: String,
      default: 'img'
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    progerssWidth: {
      type: Number,
      default: 126
    }
  },

  computed: {
    acceptType() {
      const type = this.type === 'img' ? 'image/*' : 'video/mp4'
      return type
    }
  },

  data() {
    return {
      url: '',
      ifImg: '',
      uploadButtonShow: true,
      progerssShow: false,
      errTextShow: false,
      file: null,
      authProgress: 0,
      uploader: null,
      statusText: '',
    }
  },
  methods: {
    fileChange (e) {
      this.file = e.target.files[0]
      if (!this.file) {
        alert("请先选择需要上传的文件!")
        return
      }
      // var Title = this.file.name
      var userData = '{"Vod":{}}'
      if (this.uploader) {
        this.uploader.stopUpload()
        this.authProgress = 0
        this.statusText = ''
      }
      this.uploader = this.createUploader()
      // console.log(userData)
      this.uploader.addFile(this.file, null, null, null, userData)
    },
    authUpload () {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload()
      }
    },
    // 暂停上传
    // pauseUpload () {
    //   if (this.uploader !== null) {
    //     this.uploader.stopUpload()
    //   }
    // },
    // 恢复上传
    // resumeUpload () {
    //   if (this.uploader !== null) {
    //     this.uploader.startUpload()
    //   }
    // },
    createUploader (type) {
      let self = this
      let ifImg = self.type === 'img'
      let uploader = new AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: '1610852651566564',
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {
          self.uploadFileName = uploadInfo.file.name
          self.statusText = '添加文件成功, 等待上传...'
          // console.dir(uploadInfo)
          if (self.type === 'video') {
            self.$emit('beforeUpload', { size: uploadInfo.file.size, name: uploadInfo.file.name })
          }
          self.authUpload()
        },
        // 开始上传
        onUploadstarted: function (uploadInfo) {
          Message.warning('正在上传，请稍等')
          self.uploadButtonShow = false
          self.progerssShow = true

          const apiUrl = ifImg ? '/pf-api/vod/createUploadImage' : '/pf-api/vod/createUploadVideo'
          const reqObj = ifImg ? { type: uploadInfo.file.type } : { fileName: uploadInfo.file.name, title: uploadInfo.file.name }

          api[ifImg ? 'post' : 'postJson'](apiUrl, reqObj).then(({data}) => {
            self.url = ifImg ? data.imageURL : data.videoId
            let UPLOADAUTH = data.uploadAuth
            let UPLOADADDRESS = data.uploadAddress
            let FILEID = ifImg ? data.imageId : data.videoId
            console.log(uploadInfo)
            uploader.setUploadAuthAndAddress(uploadInfo, UPLOADAUTH, UPLOADADDRESS, FILEID)
          })
          self.statusText = '文件开始上传...'
          // console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          self.statusText = '文件上传成功!'
          Message.success('上传成功')
          // if (ifImg) {
          self.$emit('change', self.url)
          // } else {
          //   self.$emit('videoSuccess', self.url)
          // }
          self.progerssShow = false
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          self.statusText = '文件上传失败!'
          self.progerssShow = false
          self.url = ''
          self.errTextShow = true
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo, code, message) {
          self.statusText = '文件已暂停上传'
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (uploadInfo, totalSize, progress) {
          // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")

          if (self.type === 'video') {
            self.$emit('progress', { total: totalSize, loaded: Math.floor(totalSize * progress), timeStamp: new Date().getTime(), percent: progress * 100 })
          }

          // let progressPercent = Math.ceil(progress * 100)
          // self.authProgress = progressPercent
          self.statusText = '文件上传中...'
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
          // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
          // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
          // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
          // let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
          // commonApi.getUploadInfo().then(({data}) => {
          //   let uploadAuth = data.UploadAuth
          //   uploader.resumeUploadWithAuth(uploadAuth)
          //   console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
          // })
          self.statusText = '文件超时...'
        },
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo) {
          // console.log("onUploadEnd: uploaded all the files")
          self.statusText = '文件上传完毕'
        }
      })
      return uploader
    }
  }
}
</script>

<style lang="scss" scoped>
.u-img-upload {
  display: inline-block;
  position: relative;
  cursor: pointer;
  .upload-input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0!important;
    cursor: pointer;
  }
  .err-text{
    color: #DD5043;
  }
  .progress-modal {
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.6);
    z-index: 3;
  }
  .progress {
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  
  
}
</style>
