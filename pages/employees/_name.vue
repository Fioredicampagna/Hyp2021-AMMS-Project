<template>
  <div class="container">
    <div class="row">
      <section class="col-md-3">
        <img
          :src="require(`~/assets/employees/images/${employee.image_name}.jpg`)"
        />
        <h4>{{ employee.name }}</h4>
      </section>

      <section class="col-md-7">
        <p>
          {{ employee.presentation }}
        </p>
      </section>
    </div>
    <!-- Unsure about employee custom tag, should it be defined somewhere? -->
    <!-- <article>
      <p>
        {{ employee.presentation }}
      </p>
    </article> -->
    <!--section class="comments">
      <h3>Comments</h3>
      <h4 v-if="article.comments.length === 0">There are no comments</h4>
      <div
        v-for="(comment, commentIndex) of article.comments"
        :key="'comments-' + commentIndex"
        class="comment"
      >
        <div class="content">
          {{ comment.content }}
        </div>
        <div class="date">
          Posted on: {{ new Date(comment.createdAt).getDate() }}/{{
            new Date(comment.createdAt).getMonth()
          }}/{{ new Date(comment.createdAt).getFullYear() }}
        </div>
      </div>
    </section-->
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { name } = route.params
    console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/employees/${name}`
    )
    const employee = data
    return {
      employee,
    }
  },
}
</script>

<style scoped>
h4 {
  margin: 20px 0;
}
.col-md-7 {
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
}
/* .comments {
  margin-top: 60px;
  text-align: left;
}
.comment {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
}
.comment .date {
  color: darkgray;
  font-size: 14px;
} */
.container {
  position: relative;
  padding-left: 6.5%;
}
section {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}
img {
  max-width: 300px;
}
p {
  margin: 10px;
  text-align: left;
}
</style>
