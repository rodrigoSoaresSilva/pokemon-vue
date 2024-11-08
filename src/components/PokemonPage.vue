<template>
    <v-app-bar app color="primary" dark>
        <v-container>
            <v-row no-gutters>
                <v-col cols="12" sm="3" class="d-flex">      
                    <div class="d-flex align-center">
                      <a href="https://pokeapi.co/" target="_blank">
                        <v-img
                          width="100"
                          src="@/assets/pokeapi_logo.png"
                        />
                      </a>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex">
                    <div class="search-section">
                        <v-text-field
                        v-model="searchText"
                        placeholder="Search..."
                        outlined
                        dense
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        class="search-input"
                        ></v-text-field>
                    </div>
                </v-col>
                <v-col cols="12" sm="3" class="d-flex">
                    <v-radio-group v-model="searchFilter" inline class="d-flex align-center">
                    <v-radio label="Name" value="name"></v-radio>
                    <v-radio label="Type" value="type"></v-radio>
                    </v-radio-group>      
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
  
    <div v-if="data && data.data?.length > 0">
        <v-container>
            <v-row>
                <v-col sm="6" md="4" lg="3" v-for="item in data.data" :key="item.id">
                    <pokemon-card :item="item" />
                </v-col>
            </v-row>
        </v-container>
        <div class="text-center">
            <v-container>
                <v-row justify="center">
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination
                                v-model="currentPage"
                                :length="data.last_page"
                                class="my-4"
                                rounded="circle"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
    <v-container v-else>
      <v-row>
        <v-col>
          <v-alert
            text="There is no data available."
            title="Sorry!"
            type="info"
            variant="tonal"
          ></v-alert>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script>
  import { getData } from '@/services/api.js';

  export default {
    data() {
      return {
        data: [],
        searchText: '',
        searchFilter: 'name',
        currentPage: 1,
      };
    },
    async created() {
      await this.fetchData();
    },
    watch: {
      searchText() {
        this.currentPage = 1;
        this.fetchData();
      },
      currentPage() {
        this.fetchData();
      },
    },
    methods: {
      async fetchData() {
        try {
          const params = {
            page: this.currentPage,
          };

          if (this.searchText) {
            if(this.searchFilter === 'name'){
              params.name = this.searchText;
            } else {
              params.type = this.searchText;
            }
          }
          const response = await getData('/', params);
          this.data = response.data;
          console.log(this.data.last_page);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      },
    },
    async changePage(page) {
      this.currentPage = page;
      await this.fetchData();
    },
  };
</script>
  
<style scoped>
  .v-app-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .search-section {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }  
</style>
  