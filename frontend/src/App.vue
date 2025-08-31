<template>
  <div id="vue-app">
    <h1>Hello from Vue.js!</h1>
    <p>This is your main application component.</p>
    <button @click="incrementCount">Click me</button>
    <p>Button was clicked {{ count }} times.</p>
    <Test></Test>
    <Table :data="tableData" />
    
  </div>
</template>

<script>
import { ref } from 'vue';
// Import the new Table component
import Table from './components/Table.vue';
import Test from './components/Test.vue';

export default {
  // Register the component
  components: {
    Table,
    Test
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