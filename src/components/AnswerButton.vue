<template>
  <button
    class="answerSelector clickable"
    :disabled="disabled"
    @click="click"
  >
    {{ question.match }}
  </button>
</template>

<script>
export default {
  name: "AnswerButton",
  props: {
    disabled: Boolean,
    question: Object,
    correct: Boolean,
  },
  data: function () {
    return {
      selected: false,
    };
  },
  methods: {
    click: function () {
      this.$emit("clicked");
    },
  },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.answerSelector {
  padding: 10px;
  color: rgb(255, 255, 255);
  width: 100px;
  margin: 10px 10px 10px 0px;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
}

.answerSelector:disabled {
  background-color: rgb(58, 66, 94);
  cursor: not-allowed;
}

.clickable {
  cursor: pointer;
  background-color: rgb(27, 28, 58);
}

.correct {
  background-color: rgb(0, 170, 109);
}
</style>
