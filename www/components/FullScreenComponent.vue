<template>
  <transition name="slide">
    <div v-if="value" class="full">
      <div class="close-btn" @click="close"></div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["modelValue"],
  methods: {
    close() {
      this.value = false;
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.full {
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--bg-color-primary);
  z-index: 2000;
  padding: 1rem;
  overflow: hidden;
}
.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-family: "Material Icons" !important;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: var(--acent-color);
  cursor: pointer;
}
.close-btn::before {
  content: "\e5cd";
}
</style>