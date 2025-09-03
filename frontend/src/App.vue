<template>
  <div id="vue-app">
    <Layout></Layout>
  </div>
</template>

<script>
import { ref } from 'vue';
// Import the new Table component
import Table from './components/Table.vue';
import Test from './components/Test.vue';
import Layout from './components/Layout.vue';

export default {
  // Register the component
  components: {
    Layout,
    Test,
    Table
  },
  setup() {
    const count = ref(0);
    
    // Sample data for the table
    const tableData = ref([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]);
    
    const incrementCount = () => {
      count.value++;
    };

    return {
      count,
      incrementCount,
      tableData
    };
  }
};
</script>

<style lang="scss">
@use 'sass:color';

#vue-app {
  text-align: center;
  margin-top: 60px;
}
</style>