<template>
  <div id="vue-app">
    <h1>Hello from Vue.js!</h1>
    <p>This is your main application component.</p>
    <button @click="incrementCount">Click me</button>
    <p>Button was clicked {{ count }} times.</p>
  </div>
</template>

<script>
// The script section defines the component's logic, data, and methods.
import { ref } from 'vue';

export default {
  // Use the setup function for composition API
  setup() {
    const count = ref(0); // A reactive variable for the click count

    const incrementCount = () => {
      count.value++;
    };

    // Return the reactive data and methods to be used in the template
    return {
      count,
      incrementCount
    };
  }
};
</script>

<style lang="scss">
/*
  The style section contains the CSS for this component.
  The `lang="scss"` attribute tells Vite to process this as a Sass file.
*/
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
      background-color: darken(#42b983, 10%);
    }
  }
}
</style>