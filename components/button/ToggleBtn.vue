<template>
  <div>
    <button
      :aria-label="ariaLabel || label"
      class="toggleBtn"
      :class="{ on: isOn, off: !isOn }"
      @click="click()"
      v-html="isOn ? label + 'ON' : label + 'OFF'"
    ></button>
  </div>
</template>

<script>
export default {
  name: "ToggleBtn",
  props: {
    isOn: { type: Boolean, required: true, default: false },
    ariaLabel: { type: String, required: false, default: "" },
    label: { type: String, required: false, default: "" },
  },
  methods: {
    click() {
      const bool = !this.isOn;
      this.$emit("click", bool);
    },
  },
};
</script>
<style lang="scss" scoped>
.toggleBtn {
  @include flex($flex-center);
  flex-direction: row;
  flex: none;
  order: 1;
  flex-grow: 0;
  min-width: 96px;
  max-width: 240px;
  height: 48px;
  padding: 0 15px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  &.on {
    border: 2px solid #ffffff;
    color: #fff;
    background: #f87deb;
  }

  &.off {
    border: none;
    color: #666;
    background: #dcdcdc;
  }
}
</style>
