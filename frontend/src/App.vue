<template>
  <div id="vue-app">
    <h1>Hello from Vue.js!</h1>
    <p>This is your main application component.</p>
    <button @click="incrementCount">Click me</button>
    <p>Button was clicked {{ count }} times.</p>
    
    <Table :data="tableData" />
    
  </div>
</template>

<script>
import { ref } from 'vue';
// Import the new Table component
import Table from './components/Table.vue';

export default {
  // Register the component
  components: {
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
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  h1 {
    color: #42b983;
  }
  button {
    background-color: #42b983;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;
    &:hover {
      background-color: color.adjust(#42b983, $lightness: -10%);
    }
  }
}
</style>