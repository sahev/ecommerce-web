<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-card elevation="5"
          :loading="loading"
          class="mx-auto my-5"
          max-width="350"
          v-for="(product, i) in productsData"
          :key="i"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-carousel height="250" show-arrows-on-hover>
            
            <v-img v-if="product.pro_src === null" aspect-ratio="1" src="http://www.camaramatozinhos.mg.gov.br/wp-content/uploads/2018/05/sem-foto.jpg"/>
            <v-carousel-item v-for="(img, i) in product.pro_src" :key="i">
              <v-img aspect-ratio="1" :src="img" :key="img"></v-img>
            </v-carousel-item>
          </v-carousel>

          <v-card-title>{{ product.pro_name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              R$ {{ product.pro_product[0].prd_price }}
            </div>

            <div>
              {{ product.pro_description }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip v-for="(weight, i) in product.pro_product" :key="i">
                {{ weight.prd_weight }} ml
              </v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import axios from "axios";

export default {
  name: "Products",
  data: () => ({
    loading: false,
    selection: 1,
    productsData: [],
  }),

  created() {
    this.getProducts();
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },

    async getProducts() {
      let res = await axios.get("products");

      this.productsData = res.data;
      console.log(this.productsData[1].pro_src);
    },
  },
};
</script>