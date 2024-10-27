<template>
  <div>
    <h1>推奨環境</h1>
    <div>
      <h2>推奨環境について</h2>
      <p>
        当サイトをご覧いただくため、下記環境を推奨しております。 <br />
        ※
        推奨環境下のご利用でも、OSとブラウザの組み合わせ、ブラウザの設定状況や機種によっては表示、機能に不具合が起こる可能性がございます。予めご了承くださいますようお願いいたします。
      </p>

      <h2>スマートフォン</h2>
      <p>
        iPhone <br />
        ・ブラウザ：Safari 最新
      </p>
      <p>
        Android <br />
        ・ブラウザ：Chrome最新 <br />
        ※上記対応環境に含まれる場合でも、OSのバージョンやお客様のご使用環境、機種によっては、ご利用頂けない場合がございます。
      </p>

      <h2>ブラウザの設定</h2>
      <p>JavaScript：ON</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequirementIndex",
  layout: "termsLayout",
  components: {},
  head() {
    return {
      title: "推奨環境",
    };
  },
};
</script>
<style lang="scss" scoped></style>
