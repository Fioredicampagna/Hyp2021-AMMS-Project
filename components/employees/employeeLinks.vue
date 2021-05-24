<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(employee, employeesIndex) of employees"
        :key="'employee-' + employeesIndex"
        class="col-md-4"
        @click="goToPath(`/employees/${employee.name}`)"
      >
        <!--div class="content">
          {{ product.image }}
        </div-->
        <img
          src="@/assets/producttypes/images/4c04f6649f009a5a4832a95f6e49b2fb.png"
        />
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

img {
  max-width: 600px;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
