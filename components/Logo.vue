<template>
  <div>
    <template v-if="isBgDark">
      <img
        :src="require(`@/assets/img/logo_whiteBalloon.svg`)"
        width="150"
        height="auto"
      />
    </template>
    <template v-else>
      <img
        :src="require(`@/assets/img/logo_blueBalloon.svg`)"
        width="150"
        height="auto"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    isBgDark: { type: Boolean, required: false, default: true },
  },
};
</script>
<style lang="scss" scoped></style>
