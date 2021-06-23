<template>
  <main class="container">
    <header>
      <h1>Our Team</h1>
    </header>
    <section>
      <employee-links :employees="employees"></employee-links>
    </section>
  </main>
</template>

<script>
import EmployeeLinks from '~/components/employees/employeeLinks.vue'
export default {
  components: {
    EmployeeLinks,
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
  head() {
    return {
      title: 'AMMS Employees',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Employees description',
          name: 'description',
          content: '',
        },
      ],
    }
  },
  methods: {
    goToEmployee(path) {
      this.$router.push({ path })
    },
  },
}
</script>
