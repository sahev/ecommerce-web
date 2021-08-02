<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <template>
      <Products />
    </template>

  </div>
</template>

<script>
import Products from "../components/products/products";

export default {
  components: {
    Products,
  },
  data: () => ({ drawer: null }),
};
</script>
