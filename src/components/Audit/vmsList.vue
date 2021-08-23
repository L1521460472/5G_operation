<template>
  <!-- 文件消息 -->
  <div id="vmsList" >
    <div class="vmsListBox" v-for="(item,index) in vmsData" :key="item.index">
      <div class="vmsListItem">
        <div class="text" v-if="item.type === 0">
          <div>{{item.content}}</div>
        </div>
        <div class="picture" v-else-if="item.type === 1">
          <img class="picture" :src="item.fileDetailUrl" />
        </div>
        <div class="audio" v-else-if="item.type === 2">
          <audio
            :ref="'audio' + index"
            @ended="handleEnded(index)"
            @loadedmetadata="handleDuration(index)"
            @timeupdate="handlePlaying"
            preload
            readyState
          >
            <source :src="item.fileDetailUrl" type="audio/mpeg" />
          </audio>
          <div class="audioCon">
            <img class="iamgeLeft" :src="item.flag ? item.imgLeft2: item.imgLeft1"  />
            {{ duration }}
            <img class="imageRight" @click="handlePlay(index)" :src="item.flag ? item.imgRight2: item.imgRight1"/>
          </div>

        </div>
        <div class="video" v-else="item.type === 3">
          <video
            class="video1"
            preload
            controls="controls"
            :src="item.fileDetailUrl"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vmsList",
  props: {
    vmsData: {
      type: Array,
    },
  },
  data() {
    return {
      duration: "1", //音频时长
    };
  },
  methods: {
    // 音频播放
    handlePlay(index) {
      this.vmsData[index].flag = !this.vmsData[index].flag
      if (this.vmsData[index].flag) {
        this.$refs[`audio${index}`][0].play()
      } else {
        this.$refs[`audio${index}`][0].pause()
      }
    },
    handleEnded(index) {
      this.vmsData[index].flag = !this.vmsData[index].flag
    },
    handleDuration(index) {
      var h = Math.floor(this.$refs[`audio${index}`][0].duration / 360);
      var m =
        Math.floor(this.$refs[`audio${index}`][0].duration / 60) < 10
          ? "0" + Math.floor(this.$refs[`audio${index}`][0].duration / 60)
          : Math.floor(this.$refs[`audio${index}`][0].duration / 60);
      var s = Math.floor(this.$refs[`audio${index}`][0].duration % 60);
      var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
      this.duration = str;
    },
    handlePlaying(e) {
      var h = Math.floor(e.target.currentTime / 360);
      var m =
        Math.floor(e.target.currentTime / 60) < 10
          ? "0" + Math.floor(e.target.currentTime / 60)
          : Math.floor(e.target.currentTime / 60);
      var s =
        Math.floor(e.target.currentTime % 60) < 10
          ? "0" + Math.floor(e.target.currentTime % 60)
          : Math.floor(e.target.currentTime % 60);
      var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
      this.currentTime = str;
    },
  },
};
</script>

<style lang="less" scoped>
#vmsList {
  width: 330px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 0 30px;
  box-sizing: border-box;
  .vmsListBox{
    width: 100%;
    .vmsListItem{
      padding-bottom: 20px;
      padding-top: 20px;
      .text{
        // margin: 15px 0px;
        word-break: break-all;
      }
      .picture{
        img{
          width: 270px;
          display: block;
        }
      }
      .audio{
        width: 100%;
        height: 72px;
        border: 1px solid #e5e5e5;
        .audioCon{
          width: 100%;
          height: 72px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .iamgeLeft {
            margin-left: 5px;
            cursor: pointer;
          }
          .imageRight {
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
      .video{
        width: 270px;
        .video1{
          width: 270px;
          height: 152px;
        }
        .video1:focus {
          outline: none;
        }
      }
    }
  }
}
</style>