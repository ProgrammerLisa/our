<template>
  <div class="u-video-lesson">
    <img-upload v-if="!ifUploadFinish" :type="'video'" @change="handleSuccess" @progress="handleProgress" @beforeUpload="beforeUpload">
      <el-button v-show="!uploading" class="g-btn-yellow" size="small">上传文件</el-button>
      <el-tooltip v-show="!uploading" class="tooltip" effect="dark" content="支持上传avi/mp4/mkv/flv格式视频，视频大小在500m以内" placement="top">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </img-upload>
    <!--  -->
    <p class="title">{{videoName}}</p>
    <div class="upload-status" v-if="uploading || ifUploadFinish">
      <!-- 视频名 -->
      <!-- <el-input class="g-bg-input form-sort-input" readonly :value=""></el-input> -->
      <!-- 进度 -->
      <div  v-if="!ifUploadFinish" class="upload-progress">
        <el-progress
          :percentage="percent"
          color="#FFAF00"
          :stroke-width="5"
          :show-text="false">
        </el-progress>
        <p class="progress">
          <span class="progress-info">{{ Math.round(percent / 100 * totalSize * 100) / 100 }}{{ ifBig ? 'M' : 'k' }}/{{ totalSize }}{{ ifBig ? 'M' : 'k' }}</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import imgUpload from '@/components/upload'

export default {
  components: { imgUpload },
  props: ['vodVideoId'],
  model: {
    prop: 'vodVideoId',
    event: 'videoSuccess'
  },
  data() {
    return {
      ifUploadFinish: false,
      uploading: false,
      percent: 0,
      ifBig: true, // 是否大于1M
      totalSize: 0,
      videoName: '',
      // 上一段已发送的数据量和时间戳
      lastLoaded: 0,
      lastTimeStamp: new Date().getTime(),
      time: 0
    }
  },
  methods: {
    handleSuccess(val) {
      this.uploading = false
      this.ifUploadFinish = true
      this.$emit('videoSuccess', val)
    },
    handleError() {
      this.uploading = false
      this.ifUploadFinish = true
    },
    handleProgress(event) {
      this.percent = event.percent
      if (event.percent === 100) return
      // 计算预估剩余时间
      if (event.percent !== 0) {
        const loadedTnterval = event.loaded - this.lastLoaded
        const timeInterval = event.timeStamp - this.lastTimeStamp
        const speed = loadedTnterval / timeInterval
        this.time = Math.floor((event.total - event.loaded) / speed / 1000)
      }

      this.lastLoaded = event.loaded
      this.lastTimeStamp = event.timeStamp
    },
    beforeUpload(file) {
      const size = file.size
      if (size > 300 * 1024 * 1024) {
        this.$message.error('上传视频不可大于300M，请重新上传')
        return false
      }
      this.ifBig = size / 1024 % 1024 > 1
      this.totalSize = Math.round((size / 1024 / 1024) * 100) / 100
      this.videoName = file.name
      this.uploading = true
      this.ifUploadFinish = false
    }
  },
  filters: {
    formateRemainTime(val) {
      const t = Number(val)
      const addZero = function (n) {
        if (+n < 10) {
          return `0${n}`
        }
        return n
      }
      return `${Math.floor(addZero(t / 60))}:${addZero(t % 60)}`
    }
  }
}
</script>

<style lang="scss">
.u-video-lesson {
  .tooltip{
    position: absolute;
    z-index: 5;
    margin-left: 8px;
  }
  .upload-status {
    display: flex;
    justify-content: center;
    align-items: center;
    .upload-progress {
      margin-left: 15px;
      width: 180px;
      display: inline-block;
      .title {
        font-size: 11px;
        transform: scale(0.92) translateX(-7px);
      }
      .el-progress-bar {
        margin-top: 5px;
        margin-bottom: 4px;
      }
      .progress {
        &-info {
          display: inline-block;
          font-size: 12px;
          transform: scale(0.83) translateX(-8px);
          color: #FFAF00;
        }
        &-remain {
          display: inline-block;
          font-size: 12px;
          transform: scale(0.83);
        }
      }
    }
  }
}
</style>
