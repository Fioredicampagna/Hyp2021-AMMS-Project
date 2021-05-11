<template>
  <main class="container">
    <header>
      <h1>Our employees</h1>
      <h4>See our team</h4>
    </header>
    <section class="employee-grid">
      <div
        v-for="(employee, employeeIndex) of employees"
        :key="'emp-' + employeeIndex"
        class="employee"
        @click="goToEmployee(`/employees/${employee.name}`)"
      >
        <employee-preview
          :name="employee.name"
          :summary="employee.presentation"
          :image="employee.image"
        ></employee-preview>
      </div>
    </section>
  </main>
</template>

<script>
// import axios from 'axios'
import EmployeePreview from '~/components/employees/employeePreview.vue'
export default {
  components: {
    EmployeePreview,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/employees`)
    const employees = data
    return {
      employees,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  methods: {
    goToEmployee(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.employee-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.employee {
  cursor: pointer;
  margin-bottom: 20px;
}
@media screen and (max-width: 600px) {
  .employee-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>
