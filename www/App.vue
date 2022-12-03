<template>
  <div>
    <app-bar-component></app-bar-component>

    <div class="content">
      <input-text-component
        v-model="text"
        label="Proprietario"
        placeholder="Entre com o texto"
      >
      </input-text-component>

      <input-text-component
        v-model="text"
        label="Consumidor"
        placeholder="Entre com o texto"
      >
      </input-text-component>

      <input-select-component
        v-model="text"
        :list="list"
        label="Placa"
        placeholder="Selecione a placa"
      >
      </input-select-component>
    </div>

    <loader-component v-if="loading"></loader-component>
  </div>
</template>

<script>
const LoaderComponent = loadVueComponent("../components/LoaderComponent.vue");
const AppBarComponent = loadVueComponent("../components/AppBarComponent.vue");
const InputTextComponent = loadVueComponent(
  "../components/InputTextComponent.vue"
);
const InputSelectComponent = loadVueComponent(
  "../components/InputSelectComponent.vue"
);
export default {
  components: {
    AppBarComponent,
    LoaderComponent,
    InputTextComponent,
    InputSelectComponent,
  },
  data: () => ({
    loading: false,
    text: "",
    list: [
      { id: "1", value: "ABC-1234" },
      { id: "2", value: "DEF-5678" },
      { id: "3", value: "GHI-9012" },
      { id: "4", value: "JKL-3456" },
      { id: "5", value: "MNO-7890" },
      { id: "6", value: "PQR-1234" },
      { id: "7", value: "STU-5678" },
      { id: "8", value: "VWX-9012" },
      { id: "9", value: "YZA-3456" },
      { id: "20", value: "GHI-7890" },
      { id: "10", value: "BCD-7890" },
      { id: "11", value: "EFG-1234" },
      { id: "12", value: "HIJ-5678" },
      { id: "13", value: "LMN-9012" },
      { id: "14", value: "OPQ-3456" },
      { id: "15", value: "RST-7890" },
      { id: "16", value: "UVW-1234" },
      { id: "17", value: "XYZ-5678" },
      { id: "18", value: "ABC-9012" },
      { id: "19", value: "DEF-3456" },
    ],
  }),
};
</script>

<style scoped>
.content {
  padding: 0 1rem;
}
</style>