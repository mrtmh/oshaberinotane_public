<template>
  <footer class="footer">
    <ul class="footer-link">
      <li><nuxt-link to="/terms/requirements/">推奨環境</nuxt-link></li>
      <li><nuxt-link to="/terms/service/">利用規約</nuxt-link></li>
    </ul>
    <p class="copyright">&copy; 2024 おしゃべりのたね</p>
  </footer>
</template>

<script>
export default {
  name: "CommonFooter",
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 20px 0 40px 0;
  &-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    max-width: 400px;
    margin: 0 auto;
    li {
      font-size: 10px;
      * {
        text-decoration: none;
      }
    }
  }
}
.copyright {
  text-align: center;
}
</style>
