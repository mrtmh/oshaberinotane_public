<template>
  <div class="imgToggleBtn">
    <img
      :src="
        require(`@/assets/img/setting/icon${src}_${isOn ? 'on' : 'off'}.png`)
      "
      width="100"
      height="100"
      class="icon__list-img"
      @click="click()"
    />
    <p>{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: "ImgToggleBtn",
  props: {
    isOn: { type: Boolean, required: true, default: false },
    src: { type: String, required: true, default: "" },
    label: { type: String, required: true, default: "" },
  },
  methods: {
    click() {
      const bool = !this.isOn;
      this.$emit("click", bool);
    },
  },
};
</script>
<style lang="scss" scoped></style>
