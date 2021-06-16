<template>
  <main class="container">
    <header>
      <h1>What does AMMS do?</h1>
      <h4>About us.</h4>
      <img
        src="https://pbs.twimg.com/profile_images/1090208956440633345/Okg4uYbh_400x400.jpg"
        alt="Nuxt Logo"
      />
    </header>
    <section>
      <h2>Another lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <nuxt-link style="text-align: center" class="col-sm-4" to="/contact-us">
        Contact us
      </nuxt-link>
    </section>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'AMMS Who We Are',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Who We Are description',
          name: 'About description',
          content:
            'This page provides a general description of the AMMS company.',
        },
      ],
    }
  },
  created() {
    const breadcrumbs = [
      {
        name: 'who we are',
      },
    ]
    this.$store.commit('SET_BREADCRUMBS', breadcrumbs)
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-bottom: 30px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
}
.col-sm-4 {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
}
</style>
