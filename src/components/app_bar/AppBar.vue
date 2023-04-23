<template>
  <div class="appbar-font">I-Love-Video</div>
  <div class="appbar-project">
    <el-button-group class="ml-3">
      <el-button type="success" size="small" :icon="Download" @click="store.downloadProject">工程下载</el-button>
      <el-button type="success" size="small" @click="RefOpenProject?.click()">
        导入
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </el-button-group>
  </div>
  <div class="appbar-control">
    <el-button type="text" @click="IntroductionDialog = true" style="margin-right: 20px">快速上手</el-button>
    <el-button type="success" round @click="emit('openRenderer')">渲染导出</el-button>
    <el-button type="text" @click="SettingDialog = true" style="margin: 0 20px 0 30px">项目设置</el-button>
    <el-button type="text" @click="AboutDialog = true">关 于</el-button>
  </div>
  <input ref="RefOpenProject" type="file" style="display: none" @change="e => store.openProject(e)" />
  <Introduction v-model:dialogVisible="IntroductionDialog" />
  <AboutModel v-model:dialogVisible="AboutDialog" />
  <ProjectSetting v-model:dialogVisible="SettingDialog" />
</template>

<script setup lang="ts">
import { Upload, Download } from '@element-plus/icons-vue'
import { useStore } from '../../store/project'
const store = useStore()
const IntroductionDialog = ref(false)
const AboutDialog = ref(false)
const SettingDialog = ref(false)
const RefOpenProject = ref<HTMLInputElement>()

const emit = defineEmits<{
  (e: 'openRenderer'): void
}>()
</script>

<style scoped>
.appbar-font {
  margin-top: 5px;
  margin-left: 20px;
  font-size: 22px;
}
.appbar-project {
  margin-left: 10vw;
  margin-top: 10px;
}
.appbar-control {
  position: absolute;
  right: 30px;
  top: 5px;
}
</style>
