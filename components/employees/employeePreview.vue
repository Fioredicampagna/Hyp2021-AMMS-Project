<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <!-- <div class="img" :style="{ 'background-image': `url(${image})` }"></div> -->
        <img :src="require(`~/assets/${image}`)" :alt="alt" />
        <h5>{{ name }}</h5>
        <h6>{{ designation }}</h6>
        <!-- <img src="@/assets/employees/images/emp-1.jpg">  -->
        <!-- <p>{{ summary }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    designation: { type: String, default: () => '' },
    alt: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
p {
  height: 60px;
}

.col-sm {
  text-align: center;
  /* box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2); */
  border-radius: 25px;
  background: #f7f7f8;
  margin: 5px;
}

img {
  width: 80%;
  height: 350px;
  max-width: 400px;
  margin: auto;
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  object-fit: scale-down;
  margin: 20px;
}
</style>
