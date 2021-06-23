<template>
  <div class="container">
    <div class="employee-grid">
      <div
        v-for="(employee, employeesIndex) of employees"
        :key="'employee-' + employeesIndex"
        class="employee"
        @click="goToPath(`/employees/${employee.name}`)"
      >
        <div class="image-holder">
          <img
            :src="require(`~/assets/${employee.image}`)"
            :alt="employee.alt"
          />
          <h5>{{ employee.name }}</h5>
          <h6 v-if="employee.designation !== null">
            {{ employee.designation }}
          </h6>
        </div>
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
.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 35px;
  margin-top: 20px;
}

@media screen and (max-width: 600px) {
  .employee-grid {
    display: block;
    margin: 40px 20px;
  }
}

.link {
  text-align: center;
  color: rgb(0, 0, 0);
  padding: 20px;
  margin: 10px;
  object-fit: scale-down;
}
.image-holder {
  cursor: pointer;
  width: 100%;
  height: 95%;
  border-radius: 25px;
  background: #f7f7f8;
  margin: 5px;
}
.employee {
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  max-width: 350px;
  max-height: 450px;
}
img {
  padding-top: 20px;
  /* max-width: 600px; */
  width: 80%;
  height: 300px;
  max-width: 400px;
  margin: auto;
  object-fit: scale-down;
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  align-items: center;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
