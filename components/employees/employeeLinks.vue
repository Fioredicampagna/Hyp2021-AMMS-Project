<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(employee, employeesIndex) of employees"
        :key="'employee-' + employeesIndex"
        class="col-sm"
        @click="goToPath(`/employees/${employee.name}`)"
      >
        <img :src="require(`~/assets/${employee.image}`)" :alt="employee.alt" />
        <nuxt-link
          style="text-align: center"
          class="link"
          :to="`/employees/${employee.name}`"
        >
          {{ employee.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employees: { type: Array, default: () => Array },
  },
  methods: {
    goToPath(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.link {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
}
.col-sm {
  text-align: center;
  /* box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2); */
  border-radius: 25px;
  background: #f7f7f8;
  margin: 5px;
  cursor: pointer;
  width: 100%;
  height: 95%;
}

img {
  width: 80%;
  height: 350px;
  max-width: 400px;
  margin: auto;
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  object-fit: scale-down;
  margin: 20px;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
