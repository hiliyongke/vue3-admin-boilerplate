<template>
  <div id="wrapper">
    <span class="label">Root</span>
    <div class="branch lv1">
      <div class="entry">
        <span class="label">Entry-1</span>
        <div class="branch lv2">
          <div class="entry">
            <span class="label">Entry-1-1</span>
            <div class="branch lv3">
              <div class="entry sole">
                <span class="label">Entry-1-1-1</span>
              </div>
            </div>
          </div>
          <div class="entry">
            <span class="label">Entry-1-2</span>
            <div class="branch lv3">
              <div class="entry sole">
                <span class="label">Entry-1-2-1</span>
              </div>
            </div>
          </div>
          <div class="entry">
            <span class="label">Entry-1-3</span>
            <div class="branch lv3">
              <div class="entry sole">
                <span class="label">Entry-1-3-1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="entry"><span class="label">Entry-2</span></div>
      <div class="entry">
        <span class="label">Entry-3</span>
        <div class="branch lv2">
          <div class="entry"><span class="label">Entry-3-1</span></div>
          <div class="entry"><span class="label">Entry-3-2</span></div>
          <div class="entry">
            <span class="label">Entry-3-3</span>
            <div class="branch lv3">
              <div class="entry"><span class="label">Entry-3-3-1</span></div>
              <div class="entry">
                <span class="label">Entry-3-3-2</span>
                <div class="branch lv4">
                  <div class="entry">
                    <span class="label">Entry-3-3-2-1</span>
                  </div>
                  <div class="entry">
                    <span class="label">Entry-3-3-2-2</span>
                  </div>
                </div>
              </div>
              <div class="entry"><span class="label">Entry-3-3-3</span></div>
            </div>
          </div>
          <div class="entry"><span class="label">Entry-3-4</span></div>
        </div>
      </div>
      <div class="entry"><span class="label">Entry-4</span></div>
      <div class="entry"><span class="label">Entry-5</span></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#wrapper {
  position: relative;
}
.branch {
  position: relative;
  margin-left: 250px;
}
.branch:before {
  position: absolute;
  top: 50%;
  left: -100px;
  width: 50px;
  margin-top: 1px;
  border-top: 2px solid #ef1a0b;
  content: '';
}
.entry {
  position: relative;
  min-height: 60px;
}
.entry:before {
  position: absolute;
  left: -50px;
  height: 100%;
  border-left: 2px solid #ef1a0b;
  content: '';
}
.entry:after {
  position: absolute;
  top: 50%;
  left: -50px;
  width: 50px;
  margin-top: 1px;
  border-top: 2px solid #ef1a0b;
  content: '';
}
.entry:first-child:before {
  top: 50%;
  width: 10px;
  height: 50%;
  margin-top: 2px;
  border-radius: 10px 0 0 0;
}
.entry:first-child:after {
  height: 10px;
  border-radius: 10px 0 0 0;
}
.entry:last-child:before {
  width: 10px;
  height: 50%;
  border-radius: 0 0 0 10px;
}
.entry:last-child:after {
  height: 10px;
  margin-top: -9px;
  border-top: none;
  border-bottom: 2px solid #ef1a0b;
  border-radius: 0 0 0 10px;
}
.entry.sole:before {
  display: none;
}
.entry.sole:after {
  width: 50px;
  height: 0;
  margin-top: 1px;
  border-radius: 0;
}
.label {
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  min-width: 150px;
  padding: 5px 10px;
  margin-top: -15px;
  line-height: 20px;
  text-align: center;
  border: 2px solid #ef1a0b;
  border-radius: 5px;
}
</style>
