<template>
  <div class="control-button">
    <TimelineControl @up-scale="upScale" @down-scale="downScale" />
  </div>

  <div class="timeline-container">
    <div class="timeline">
      <Timeline ref="timelineCom" />
    </div>

    <div class="strip-container">
      <TimelineContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
const timelineCom = ref()
const upScale = () => {
  timelineCom.value.upScale()
}
const downScale = () => {
  timelineCom.value.downScale()
}
</script>

<style scoped>
.control-button {
  display: flex;
  /* margin-left: 5vw; */
}
.strip-container {
  height: 50vh;
  position: relative;
  overflow-x: hidden;
  /* height: calc(100% - 20px); */
  background-color: rgb(44 45 54);
}
.timeline-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
