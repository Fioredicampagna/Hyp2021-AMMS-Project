<template>
  <section>
    <h1>Contact us</h1>
    <form class="form">
      <label class="grey-text"
        >Your name
        <input type="text" class="form-control" />
      </label>

      <br />

      <label class="grey-text"
        >Your email <input type="email" class="form-control"
      /></label>

      <br />

      <label class="grey-text"
        >Subject <input type="text" class="form-control"
      /></label>

      <br />

      <label class="grey-text"
        >Your message
        <textarea type="text" class="form-control" rows="3"></textarea>
      </label>
      <br />

      <button class="submit-button" type="submit">Send</button>
    </form>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'AMMS Contact Us',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Contact-Us description',
          name: 'Contact-Us description',
          content:
            'This page provides a way to get in touch with the AMMS company',
        },
      ],
    }
  },
  created() {
    const breadcrumbs = [
      {
        name: 'contact us',
      },
    ]
    this.$store.commit('SET_BREADCRUMBS', breadcrumbs)
  },
}
</script>

<style scoped>
form {
  display: inline;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
}
.form-control {
  margin-bottom: 10px;
  width: calc(100%+30px);
  border: 1px solid grey;
  border-radius: 4px;
}
.submit-button {
  margin-top: 30px;
  padding: 10px 30px;
  border: 1px solid grey;
  border-radius: 4px;
}
</style>
