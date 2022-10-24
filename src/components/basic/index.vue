<template>
  <div
    v-show="show"
    ref="scrollToTop"
    :class="['scroll-totop', { 'default-style': useDefault }]"
    @click="scrollToTop"
  >
    <i
      v-if="useDefault"
      class="default-icon"
    />
    <div id="custom-style">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbScrolltotop',
  props: {
    visibleHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: ''
    },
    right: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      useDefault: true
    };
  },
  mounted() {
    if (this.right > 0) {
      this.$refs.scrollToTop.style.right = this.right + 'px';
    }
    if (this.bottom > 0) {
      this.$refs.scrollToTop.style.bottom = this.bottom + 'px';
    }
    if (document.getElementById('custom-style').children.length) {
      this.useDefault = false;
    }
    let target = this.target ? document.getElementById(this.target) : document;
    if (!target) {
      throw Error("target should be an element's id attribute name");
    }
    target.addEventListener('scroll', () => {
      let top =
        target == document
          ? target.body.scrollTop || target.documentElement.scrollTop
          : target.scrollTop;
      this.show = top >= this.visibleHeight ? true : false;
    });
  },
  methods: {
    scrollToTop() {
      let target = this.target
        ? document.getElementById(this.target)
        : document;
      // 为兼容IE和safari，放弃scrollTo(options)，改用raf
      this.scroll(target);
    },
    scroll(target) {
      let top =
        target == document
          ? target.body.scrollTop || target.documentElement.scrollTop
          : target.scrollTop;
      if (top > 0) {
        window.requestAnimationFrame(() => {
          this.scroll(target);
        });
        if (target != document) {
          // 为兼容IE，element不具有scrollTo方法
          target.scrollTop = top - top / 10;
        } else {
          window.scrollTo({
            top: top - top / 10
          });
        }
      }
      // target.scrollTo({
      //   top: 0,
      // behavior: 'smooth'
      // })
    }
  }
};
</script>

<style scoped>
.scroll-totop {
  position: fixed;
  right: 20px;
  bottom: 100px;
  cursor: pointer;
}
.default-style {
  width: 40px;
  height: 40px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
}
.default-icon {
  position: absolute;
  top: -3px;
  left: 5px;
  width: 0;
  height: 0;
  border-color: transparent transparent #0a0a0a transparent;
  border-style: solid;
  border-width: 15px;
  border-radius: 5px;
}
</style>
