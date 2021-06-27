<template>
  <div class="areaPreview">
    <div class="card">
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
.card {
  align-items: center;
  padding: 20px 10px;
  border: 1px solid grey;
  border-radius: 4px;
}
p {
  height: 60px;
}

.img {
  width: 100%;
  height: 200px;
  max-width: 600px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 20px 0;
  object-fit: scale-down;
}
</style>
