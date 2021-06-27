<template>
  <div class="areaPreview">
    <div class="area-card">
      <h3>{{ name }}</h3>
      <img class="img" :src="require(`~/assets/${image}`)" :alt="alt" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    alt: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.area-card {
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 300px;
  border-radius: 4px;
}

.img {
  padding-top: 20px;
  width: 80%;
  height: auto;
  max-height: 200px;
  max-width: 400px;
  margin: auto;
  object-fit: scale-down;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  /* align-items: center; */
}
h3 {
  text-align: center;
}
</style>
