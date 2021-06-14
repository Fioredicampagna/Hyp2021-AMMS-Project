<template>
  <agile
    :nav-buttons="false"
    :dots="false"
    :autoplay-speed="5000"
    :speed="2500"
    fade
    pause-on-dots-hover
    autoplay
  >
    <div v-for="n in 3" :key="n" class="slide" :class="`slide-${n}`">
      <p slot="caption" class="slide-element sl-45 title">{{ captions[0] }}</p>
      <p slot="description" class="slide-element sl-45 description">
        {{ descriptions[0] }}
      </p>
    </div>
  </agile>
</template>

<script>
export default {
  data() {
    return {
      captions: ['The first place that you need to have a look in the market'],
      descriptions: ['If you are looking for something related to ICT, then you are in the right place. We have bunch of products you might insterest.'],
    }
  },
  head() {
    return {
      title: 'AMMS Home Page',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Home Page description',
          name: 'About description',
          content:
            'Test description for the home page.. Some words to make it a bit longer.',
        },
      ],
    }
  },
  created() {
    const breadcrumbs = []
    this.$store.commit('SET_BREADCRUMBS', breadcrumbs)
  },
}
</script>

<style scoped>
.description{
  font-size: xx-large;
}
.title{
  font-size: xxx-large;
  font-weight: bold;
}
.slide-element {
  position: inherit;
  text-align: center;
}

.sl-45 {
  top: 45%;
}

.agile__dots {
  bottom: 10px;
  flex-direction: column;
  right: 30px;
  position: absolute;
}

.agile__dot {
  margin: 5px 0;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button,
.agile__dot:hover button {
  background-color: #fff;
}

.slide-1 {
  background-image: url('~/assets/main/computer1.jpg');
}
.slide-2 {
  background-image: url('~/assets/main/mainboard.jpg');
}
.slide-3 {
  background-image: url('~/assets/main/room.jpg');
}

.slide {
  align-items: center;
  color: #fff;
  display: block;
  /* justify-content: center; */
  height: 600px;
  width: 100%;
}

h1 {
  margin-bottom: 30px;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .slide {
    align-items: center;
    color: #fff;
    display: block;
    /* justify-content: center; */
    height: 600px;
    width: 100%;
  }
}

@media only screen and (min-width: 900px) {
  .slide {
    align-items: center;
    color: #fff;
    display: block;
    /* justify-content: center; */
    height: 900px;
    width: 100%;
  }
}
</style>
