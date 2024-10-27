<template>
  <Service></Service>
</template>

<script>
import Service from "@/components/terms/Service.vue";
export default {
  name: "RequirementIndex",
  layout: "termsLayout",
  components: {
    Service: Service,
  },
  head() {
    return {
      title: "利用規約",
    };
  },
};
</script>
<style lang="scss" scoped>
@charset "utf-8";
</style>
