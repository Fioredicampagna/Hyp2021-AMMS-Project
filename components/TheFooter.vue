<template>
  <div class="footer-content">
    <p class="footer-text">
      Our team is always here to help. You can contact us during business hours
      at:
    </p>
    <ul class="ul-contacts">
      <li>Italy 0423 555 321</li>
      <li>Australia 1420 333 7771</li>
      <li>USA 1987 431 6238</li>
      <li>Canada 1555 310 4720</li>
    </ul>
    <img
      src="~/static/logo_white_large.png"
      alt="AMMS company logo"
      class="footer-logo"
    />
    <p class="footer-text">
      © 2005-2021 Mozilla and individual contributors. Content is available
      under these licenses.
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style>
.footer-content {
  padding-top: 20px;
  padding-bottom: 10px;
}
.ul-contacts {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-bottom: 35px;
}
.footer-text {
  text-align: center;
}
.footer-logo {
  height: 60px;
  padding-bottom: 10px;
  width: auto;
}

@media screen and (max-width: 1000px) {
  .ul-contacts {
    flex-direction: column;
  }
}
</style>
