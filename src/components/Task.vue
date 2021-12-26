<template>
  <div class="task">
    <br />
    <p id="id">
      Task ID: <span id="id_id">{{ module.id }}</span>
    </p>
    <p>{{ task.description }}</p>

    <!-- Display Hebrew String -->
    <div class="textBox">
      <h2>
        <!-- Loop over each block of text that has a mapped value -->
        <span
          v-for="(question, questionIndex) in module.questions"
          :key="questionIndex"
          class="selectBlock"
        >
          <span
            v-if="typeof question.match == 'undefined'"
            :style="question.style"
          >
            {{ question.text }}
          </span>

          <SelectableText
            v-else
            v-for="(
              clickableString, clickableStringIndex
            ) in question.getClickableStrings()"
            :key="clickableStringIndex"
            :str="clickableString"
            :qIndex="questionIndex"
            :styling="question.style"
            @clicked="selectableClicked"
          />
        </span>
      </h2>
    </div>

    <div class="answers">
      <template v-for="(question, questionIndex) in module.questions">
        <AnswerButton
          v-if="question.match != null"
          :key="questionIndex"
          :disabled='!attempt'
          :question="question"
          @clicked="answerSelected(questionIndex)"
        />
      </template>
    </div>
    <br />
    <hr />
  </div>
</template>

<script>
import SelectableText from "./SelectableText.vue";
import AnswerButton from "./AnswerButton.vue";
import MatchingModule from "../classes/MatchingModule.js";
import MatchingModuleAttempt from "../classes/MatchingModuleAttempt.js";

export default {
  name: "Task",
  components: {
    SelectableText,
    AnswerButton,
  },
  props: {
    task: Object,
  },
  data: function () {
    return {
      module: new MatchingModule(this.task),
      attempt: null,
      selected: {},
    };
  },
  methods: {
    selectableClicked: function (selected) {
      if (this.attempt === null) {
        this.attempt = new MatchingModuleAttempt(this.module);
      }
      
      this.attempt.selectableClicked(selected);
    },
    answerSelected: function (index) {
      if (this.attempt === null) {
        alert("You must begin an attempt by selecting some text");
      } else {
        const gotCorrect = this.attempt.answerSelected(index);
        if (gotCorrect) {
          this.module.questions[index].gotCorrect = true;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task {
  margin: 10px;
  align-items: center;
}

.textBox {
  padding: 20px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
}

#id {
  font-size: 0.7em;
  font-weight: 600;
  color: rgb(109, 109, 109);
}

#id_id {
  color: rgb(170, 92, 92);
}

.answers {
  display: flex;
}

.selectBlock {
  border-right: 0px solid rgb(218, 218, 218);
  /* border-left: 1px brown; */
  /* margin: 1px; */
  /* padding: 1px; */
}
</style>
