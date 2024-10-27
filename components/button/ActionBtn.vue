<template>
  <button
    :aria-label="ariaLabel || label"
    class="actionBtn"
    :class="[color, { notActive: !isActive }]"
    @click="click()"
    v-html="label"
  ></button>
</template>

<script>
export default {
  name: "ActionBtn",
  props: {
    ariaLabel: { type: String, required: false, default: "" },
    label: { type: String, required: false, default: "" },
    color: { type: String, required: false, default: "gray" },
    isActive: { type: Boolean, required: false, default: true },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.actionBtn {
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
  border: 2px solid #ffffff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  &.aqua {
    color: #fff;
    background: #3dbef3;
  }

  &.green {
    color: #fff;
    background: #51ce3c;
  }

  &.pink {
    color: #fff;
    background: #f87deb;
  }

  &.gray {
    background: #ededed;
  }
  &.notActive {
    pointer-events: none;
    color: #999;
    background: #dbdbdb;
    border-color: #dbdbdb;
  }
}
</style>
