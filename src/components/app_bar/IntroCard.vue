<template>
  <div class="step" v-if="step === 1">
    <h1>Step 1. 上传资产素材</h1>
    <h3>说明：在左侧资产素材视图区域操作</h3>
    <h3 style="margin-top: 50px">
      1. 点击 <span><el-button :icon="Upload">Upload</el-button> 可上传资产素材</span>
    </h3>
    <h3>
      2. 点击 <span><el-button :icon="Delete">Delete</el-button> 可删除选中的资产</span>
    </h3>
    <h3>
      3. 点击 <span><el-button :icon="UploadFilled" type="success">Update</el-button> 可更新选中的资产</span>
    </h3>
  </div>
  <div class="step" v-if="step === 2">
    <h1>Step 2. 创建素材条带</h1>
    <h3>说明：在下方素材轨道区域右键打开菜单</h3>
    <div class="step2-strip">
      <div class="menu">
        <el-button type="text" size="default">Add Text</el-button>
        <br />
        <el-button type="text" size="default">Add Video</el-button>
        <br />
        <el-button type="text" size="default">Add Image</el-button>
        <br />
        <el-button type="text" size="default">Add Audio</el-button>
      </div>
      <p class="arrow">>></p>
      <div class="strips">
        <div class="text-strip">字幕 New Text</div>
        <div class="video-strip">视频素材.mp4</div>
        <div class="image-strip">图片素材.jpg</div>
        <div class="audio-strip">音频素材.mp3</div>
      </div>
    </div>
  </div>
  <div class="step" v-if="step === 3">
    <h1>Step 3. 修改素材属性</h1>
    <h3>说明：选中素材在右侧素材属性审视窗口操作</h3>

    <div class="step3-Inspector">
      <el-form label-width="120px" size="small">
        <el-form-item label="Asset">
          <select name="" id="">
            <option value="">示例资产1.png</option>
            <option value="">示例资产2.mp4</option>
          </select>
        </el-form-item>

        <el-form-item label="Start">
          <el-input-number :precision="3" v-model="start" />
        </el-form-item>
        <el-form-item label="Offset">
          <el-input-number :precision="3" v-model="offset" />
        </el-form-item>
        <el-form-item label="Length">
          <el-input-number :precision="3" v-model="length" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload, UploadFilled, Delete } from '@element-plus/icons-vue'
defineProps<{
  step: number
}>()

const start = ref(0)
const offset = ref(0)
const length = ref(0)
</script>

<style scoped>
.step {
  margin: 0 50px;
}
.step2-strip {
  margin-top: 50px;
  background-color: rgb(44 45 54);
  border-radius: 6px;
  padding: 20px;
}
.step3-Inspector {
  margin-top: 50px;
  background-color: #cecfd1;
  padding: 10px;
  border-radius: 6px;
  /* color: white; */
}
.menu {
  padding: 5px;
  position: fixed;
  background-color: rgb(36 36 40);
  border-radius: 10px;
}
.strips {
  color: white;
  margin-left: 220px;
}
.text-strip {
  background-color: green;
  border-radius: 2px;
  width: 100px;
  height: 30px;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.video-strip {
  background-color: rgb(72, 72, 197);
  border-radius: 2px;
  width: 100px;
  height: 30px;
  margin: 5px 0;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.image-strip {
  background-color: rgb(152, 92, 8);
  border-radius: 2px;
  width: 100px;
  height: 30px;
  margin: 5px 0;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.audio-strip {
  background-color: rgb(211, 111, 128);
  border-radius: 2px;
  width: 100px;
  height: 30px;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.arrow {
  position: absolute;
  left: 40%;
  top: 45%;
  font-size: 50px;
  color: white;
}
</style>
