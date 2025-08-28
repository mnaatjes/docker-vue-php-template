<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="key in Object.keys(data[0])" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td v-for="key in Object.keys(item)" :key="key">{{ item[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use '../styles/variables' as v;

.table-container {
  margin: v.$spacing-xl 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-family: v.$font-family-base;
}

th, td {
  padding: v.$spacing-md;
  text-align: left;
  border-bottom: 1px solid v.$medium-grey;
}

th {
  background-color: v.$primary-color;
  color: v.$white;
  text-transform: capitalize;
}

tr:nth-child(even) {
  background-color: v.$light-grey;
}

tr:hover {
  background-color: v.$medium-grey;
  cursor: pointer;
}
</style>