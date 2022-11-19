import { importFile } from "../../helpers/importFile.js";
const { defineComponent } = Vue;
const template = importFile("./js/components/LoaderComponent/LoaderComponent.html");

export default defineComponent({
    // type inference enabled

    data() {
        return {
            count: 1,
            msg: 'Hello Vue 3 + TypeScript + Vite',
            name: 'John Doe'
        }
    },
    template

})