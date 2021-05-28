<template>
  <main class="container">
    <header>
      <h1>Our Team</h1>
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
          :designation="employee.designation"
          :image="employee.image_name"
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
  async asyncData({ $axios, store }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/employees`)
    const employees = data
    const breadcrumbs = [
      {
        name: 'employees',
      },
    ]
    store.commit('SET_BREADCRUMBS', breadcrumbs)

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
h1 {
  margin-bottom: 20px;
  margin-left: 20px;
  text-align: left;
}
.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 35px;
  margin-top: 20px;
}
.employee {
  cursor: pointer;
  margin-bottom: 20px;
  max-width: 350px;
  max-height: 450px;
}
@media screen and (max-width: 600px) {
  .employee-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>
