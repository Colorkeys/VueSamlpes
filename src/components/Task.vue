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
            v-if="!('match' in question) || question.match === null"
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
        <div
          v-if="question.hasAnswer()"
          :key="questionIndex"
          class="matchAnswer"
          @click="answerSelected(questionIndex)"
        >
          {{ question.match }}
        </div>
      </template>
    </div>
    <br />
    <hr />
  </div>
</template>

<script>
import SelectableText from "./SelectableText.vue";
import MatchingModule from "../classes/MatchingModule.js";
import MatchingModuleAttempt from "../classes/MatchingModuleAttempt.js";

export default {
  name: "Task",
  components: {
    SelectableText,
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
      this.attempt.answerSelected(index);
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

.matchAnswer {
  padding: 10px;
  background-color: rgb(27, 28, 58);
  color: rgb(255, 255, 255);
  width: 100px;
  margin: 10px 10px 10px 0px;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
}

.selectBlock {
  border-right: 1px solid rgb(218, 218, 218);
  /* border-left: 1px brown; */
  /* margin: 1px; */
  /* padding: 1px; */
}
</style>
