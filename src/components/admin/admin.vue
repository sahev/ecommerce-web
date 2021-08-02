<template>
<v-app>
  <v-file-input
    v-model="files"
    color="deep-purple accent-4"
    counter
    label="File input"
    multiple
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
  >

    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
      <div>
        <!-- <b-spinner label="Spinning" v-if="isLoading"></b-spinner> -->
        <v-btn variant="primary" @click="sheetToJson">Importar</v-btn>
        <v-btn class="ml-2" variant="danger" @click="clearAll">Limpar</v-btn>
        </div>
            <v-main> 
      <router-view></router-view>
    </v-main>
    
  </v-app>
  
</template>
<script>
import XLSX from "xlsx";
// import Products from '../products/products.vue'
export default {
  name: "Admin",
  props: {},
  components: {
  },
  data() {
    return {
      files: null,
      columns: [],
      reader: new FileReader(),
      message: "",
      sheetItems: [],
      isLoading: false,
      loadingMessage: "",
      paginationCurrentPage: 1,
      paginationPerPage: 10,
      profile: {},
      islogged: false,
      status: false,

    };
  },
  created() {
  },
  computed: {
    paginationRows() {
      return this.sheetItems.length;
    },
  },
  methods: {
    sheetToJson() {

      this.reader.onload = (e) => {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: "array" });
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1,
          });
          if (roa.length) result[sheetName] = roa;
        });
        this.sheetItems = result;
        this.sheetItems = result[Object.keys(result)[0]];
        this.formatNumbers(workbook.SheetNames, result);
        this.isLoading = false;
      };

      this.reader.readAsArrayBuffer(this.files);

    },

    formatNumbers(sheetNames, result) {
      result[sheetNames[0]].map((sheetItem, idx) => {
        if (idx === 0) {
          this.columns = sheetItem;
          return;
        }
      });
    },
    clearAll() {
      this.reader.abort();
      this.files = null;
      this.columns = [];
      this.sheetItems = [];
      this.message = "";
      this.paginationCurrentPage = 1;
    },
    
   
  },
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.form-header {
  display: flex;
  justify-content: space-between;
}
.form-bottom {
  display: flex;
  justify-content: space-between;
}
</style>
