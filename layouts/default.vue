<template>
  <main class="page">
    <the-footer class="page-footer"></the-footer>
    <Nuxt class="page-content" />
    <the-breadcrumbs class="page-breadcrumbs"></the-breadcrumbs>
    <the-header class="page-header"></the-header>
  </main>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheBreadcrumbs from '~/components/TheBreadcrumbs.vue'

export default {
  components: {
    TheHeader,
    TheBreadcrumbs,
  },
}
</script>

<style>
h1 {
  text-align: left;
  font-size: xxx-large;
}
h3 {
  text-align: left;
}
h4 {
  text-align: left;
}
html {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}
p {
  text-align: justify;
  font-size: larger;
}
a {
  color: white;
}
a:hover {
  color: white;
}
img {
  width: 100%;
}

.page {
  position: relative;
  margin: auto;
  max-width: 100%;
  align-items: center;
}
.page-header {
  position: fixed;
  width: 100%;
  height: 75px;
  top: 0px;

  padding-left: 10%;
  padding-right: 10%;

  background: black;
  color: white;

  text-align: center;
}
.page-breadcrumbs {
  position: fixed;
  width: 100%;
  height: 45px;
  top: 75px;

  padding-left: 10%;
  padding-right: 10%;

  background: rgb(211, 211, 211);
  color: black;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.page-content {
  position: relative;
  width: 100%;
  min-height: 100vh;

  padding-top: 120px;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 300px;
}
.page-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: fit-content;

  padding-left: 10%;
  padding-right: 10%;

  background: black;
  color: white;

  text-align: center;
}

@media screen and (max-width: 1000px) {
  .page-header {
    min-height: 75px;
    height: auto;
    padding-left: 3%;
    padding-right: 3%;
  }
  .page-content {
    padding-bottom: 500px;
  }
}
</style>
