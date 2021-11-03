<template>
  <input
    type="text"
    :placeholder="prompt"
    v-model="model"
    @blur="Validata('ruleForm', prompt)"
    @focus="clearValidata('ruleForm', prompt)"
  />
</template>


<script>
export default {
  props: {
    model: String,
    prompt: String,
  },
  methods: {
    Validata(val, pro) {
      this.$refs[val].validateField(pro);
    },
    clearValidata(val, pro) {
      this.$refs[val].clearValidate(pro);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  height: 0.292826rem;
  padding: 2px;
  font-size: 0.102489rem;
  border: none;
  border-bottom: solid 1px #000;
  letter-spacing: 1px;
  box-sizing: border-box;
}
input:focus {
  outline: none;
  border-bottom: solid 2px rgb(0, 102, 204);
  box-sizing: border-box;
}
</style>