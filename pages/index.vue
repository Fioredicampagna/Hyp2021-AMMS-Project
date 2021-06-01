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
    <div v-for="n in 2" :key="n" class="slide" :class="`slide-${n}`">
      <h2 slot="caption" class="slide-element sl-45">{{ captions[n] }}</h2>
      <p slot="description" class="slide-element sl-55">
        {{ descriptions[n] }}
      </p>
    </div>
  </agile>
</template>

<script>
export default {
  data() {
    return {
      captions: ['', 'This is slide 1', 'This is a third and final slide'],
      descriptions: ['', 'Description 1 ', 'Final description'],
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
          content: '',
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
.slide-element {
  position: fixed;
  left: 10%;
}

.sl-45 {
  top: 45%;
}

.sl-55 {
  top: 55%;
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
  background-image: url('https://images.unsplash.com/photo-1509549649946-f1b6276d4f35?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ');
}
.slide-2 {
  background-image: url('https://images.unsplash.com/photo-1511469054436-c7dedf24c66b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9');
}

.slide {
  align-items: center;
  color: #fff;
  display: block;
  /* justify-content: center; */
  height: 600px;
  width: 100%;
}

h2 {
  margin-bottom: 30px;
  font-weight: bold;
}
</style>
