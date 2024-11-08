<template>
    <v-card
      class="mx-auto rounded-lg elevation-10"
      max-width="344"
      style="background-color: #ffffff; padding: 16px;"
    >
      <v-img
        height="180px"
        :src="item.image"
        class="mb-4"
      ></v-img>
    
      <v-card-title class="text-h6 font-weight-bold text-center">
        {{ item.name[0].toUpperCase() + item.name.slice(1) }}
      </v-card-title>

      <v-card-subtitle class="text-body2 text-center">
        Type:  <strong>{{ formatTypes(item.type) }}</strong>
      </v-card-subtitle>
    
      <v-card-subtitle class="text-body2 text-center">
        Height: <strong>{{ item.height }} cm</strong> | Weight: <strong>{{ item.weight }} Kg</strong>
      </v-card-subtitle>
  
    </v-card>
</template>
  
<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    methods: {
        formatTypes(typeString) {
            return typeString
                .split(', ')
                .map(type => type.charAt(0).toUpperCase() + type.slice(1))
                .join(' | ');
        }
    },
  };
</script>
  
<style scoped>
    .v-card {
        border-radius: 12px;
    }

    .v-card-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #1976D2;
    }

    .v-card-subtitle {
        font-size: 1rem;
        color: #424242;
    }

    .v-img {
        border-radius: 8px;
    }
</style>
  