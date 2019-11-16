<template>
  <div>
    <sub-nav />
    <nuxt />
  </div>
</template>

<script>
import SubNav from "@/components/SubNav";
export default {
  components: {
    SubNav
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.go(-1);
    }
  }
};
</script>

<style>
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("//at.alicdn.com/t/webfont_yst6vnl4i78.eot"); /* IE9*/
  src: url("//at.alicdn.com/t/webfont_yst6vnl4i78.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("//at.alicdn.com/t/webfont_yst6vnl4i78.woff2")
      format("woff2"),
    url("//at.alicdn.com/t/webfont_yst6vnl4i78.woff") format("woff"),
    /* chrome、firefox */ url("//at.alicdn.com/t/webfont_yst6vnl4i78.ttf")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("//at.alicdn.com/t/webfont_yst6vnl4i78.svg#AlibabaPuHuiTiL")
      format("svg"); /* iOS 4.1- */
}
html,
body {
  /* font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 62.5% !important; */
  font-family: "webfont", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  /* font-size: 16px; */
  font-size: 62.5% !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

#__nuxt,
#__layout {
  height: 100%;
}

#__layout > div {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
