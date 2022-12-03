<template>
  <div class="input-item">
    <div class="form-label">{{ label }}</div>
    <el-input size="large" v-model="value" :placeholder="placeholder" />
    <div class="clear-btn" @click="clear"></div>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["modelValue", "placeholder", "label"],
  methods: {
    clear() {
      this.value = "";
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
.input-item {
  margin-bottom: 1rem;
  position: relative;
}
.clear-btn {
  font-family: "Material Icons" !important;
  position: absolute;
  top: 1.4rem;
  right: 0.2rem;
  text-align: center;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 2rem;
  color: var(--ligth-acent-color);
  z-index: 1000;
  cursor: pointer;
}

.clear-btn::before {
  content: "\e888";
}
</style>