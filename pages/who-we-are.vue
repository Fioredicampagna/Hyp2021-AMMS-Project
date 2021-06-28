<template>
  <main>
    <header>
      <h1>What does AMMS do?</h1>
      <h4>About us.</h4>
      <img
        src="~/assets/main/companybuilding.jpg"
        alt="Image that shows the main HQ of AMMS."
      />
    </header>
    <section>
      <h2>AMMS</h2>
      <p>
        AMMS is a world leading manufacturer of hardware and software solutions
        that enable customers of all the world to have a pleasent experience
        with technology. Based in Milan, Italy, we have a global presence and an
        international reach. We have offices located in Denver (Colorado USA),
        Toronto (Canada), and Melbourne (Australia) to provide export sales,
        support and service to our clients and partners around the world. A
        network of market leading security professionals, and a rigorous
        training and quality control program, ensures first class sales,
        service, and support. Our partners play an integral role in our sales
        and support network, providing the expertize and experience to help you
        plan, deploy, integrate and manage an ICT solution.
      </p>
      <h2>Our Story</h2>
      <p>
        AMMS was founded in 2020 with the primary vision of providing innovative
        hardware and software solutions. Company founders Tom Hanks and Will
        Smith used the experience they had gained in the Italian market to
        create a business based entirely on end user needs. Now, a year later
        and with ICT products and systems used every day by tens of thousands of
        companies worldwide, our vision stays strong – to develop innovative
        products that are easy to use, that integrate with existing systems to
        leverage investments already made, and that are manufactured to the
        highest of standards. Still privately owned, the business continues to
        grow and develop new products through an unwavering commitment to
        Research &amp; Development. Ongoing investment in state of the art
        production facilities in Milan, Italy, ensures consistent quality with
        products manufactured to ISO9000 standards.
      </p>
      <h2>Our People</h2>
      <p>
        We firmly believe that our people are our biggest asset, and it’s their
        passion and commitment that sets AMMS apart from the rest. For that
        reason, we work hard to create an environment that’s enjoyable and
        collaborative, and so that everyone is inspired to continue to achieve
        the impossible. We look for team players, proactive candidates with a
        strong sense of responsibility, and those with a high level of
        initiative and an amazing drive to improve.
      </p>
      <h2>AMMS</h2>
      <p>
        We think differently. We stand out from the crowd but for all the right
        reasons. We innovate, we move fast, and we constantly challenge
        ourselves to come up with better ways of doing things. But it’s not just
        about the ideas - it’s also about taking action. That’s why you won’t
        see a lot of red tape and formality around here. We empower our people
        to make decisions and take ownership of their ideas. We get stuck in, we
        make things happen, and - most importantly - we get results.
      </p>

      <nuxt-link class="col-sm-4" to="/contact-us"> Contact us </nuxt-link>
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
          hid: 'Who-We-Are description',
          name: 'Who-We-Are description',
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
header {
  text-align: center;
  margin-bottom: 20px;
}
img {
  width: 100%;
}
p {
  text-align: left;
  padding-bottom: 20px;
}
.col-sm-4 {
  text-align: center;
  color: cadetblue;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
}
</style>
