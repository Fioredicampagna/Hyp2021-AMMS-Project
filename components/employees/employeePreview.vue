<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <!-- <div class="img" :style="{ 'background-image': `url(${image})` }"></div> -->
        <img :src="require(`~/assets/employees/images/${image}.jpg`)" />
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
  },
}
</script>

<style scoped>
p {
  height: 60px;
}

.col-sm {
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
}

img {
  width: 80%;
  height: 350px;
  max-width: 400px;
  margin: auto;
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
}
</style>
