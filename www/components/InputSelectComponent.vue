<template>
  <div>
    <full-screen-component :id="fsId" v-model="showFullScreen">
      <div class="form-label">{{ label }}</div>
      <el-input
        size="large"
        v-model="value"
        :placeholder="placeholder"
        @focus="showFullScreen = true"
      />
      <div class="content">
        <div class="list" v-for="item in list" :key="item.value">
          <span class="item">{{ item.value }}</span>
          <el-divider />
        </div>
      </div>
    </full-screen-component>
    <div class="input-item">
      <div class="form-label">{{ label }}</div>
      <el-input
        size="large"
        v-model="value"
        :placeholder="placeholder"
        @focus="showFullScreen = true"
      />
      <div class="clear-btn" @click="clear"></div>
    </div>
  </div>
</template>

<script>
const FullScreenComponent = loadVueComponent(
  "../components/FullScreenComponent.vue"
);
export default {
  components: {
    FullScreenComponent,
  },
  emits: ["update:modelValue"],
  props: ["modelValue", "list", "placeholder", "label"],
  data: () => ({
    showFullScreen: true,
    fsId: createId(),
    list: [],
  }),
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
.content {
  height: calc(100% - 5rem);
  overflow: auto;
  margin-top: 2rem;
}
.item {
  display: block;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 1.5rem;
}
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

.list span {
  font-size: 0.8rem;
  padding: 0 0.5rem;
  cursor: pointer;
}
</style>