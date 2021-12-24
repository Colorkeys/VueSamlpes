<template>
  <div class="task">
    <br>
    <p id="id">
      Task ID: <span id="id_id">{{ task.id }}</span>
    </p>
    <p>{{ task.description }}</p>

    <!-- Display Hebrew String -->
    <div class="textBox">
      <h2>
        <!-- Loop over each block of text that has a mapped value -->
        <span
          v-for="(matchBlock, index) in task.data"
          :key="index"
          class="selectBlock"
        >
          <span v-if="matchBlock.match === null">{{ matchBlock.text }}</span>

          <SelectableText
            v-else
            v-for="(s, i) in 'selectSplitChar' in matchBlock
              ? matchBlock.text.split(matchBlock.selectSplitChar)
              : [matchBlock.text]"
            :key="i"
            :blockIndex="index"
            :str="
              s + (matchBlock.selectSplitChar ? matchBlock.selectSplitChar : '')
            "
            @clicked="selectableTextClicked"
          />
        </span>
      </h2>
    </div>

    <div class="answers">
      <template v-for="(matchBlock, index) in task.data">
        <div
          v-if="matchBlock.match !== null"
          :key="index"
          class="matchAnswer"
          @click="answerSelected(index)"
        >
          {{ matchBlock.match }}
        </div>
      </template>
    </div>
    <br>
    <hr />
  </div>
</template>

<script>
import SelectableText from "./SelectableText.vue";

export default {
  name: "Task",
  props: {
    task: Array,
  },
  data: function () {
    return {
      selected: {},
    };
  },
  components: {
    SelectableText,
  },
  methods: {
    selectableTextClicked: function (selected) {
      // Add a Set if one does not exist for this block.
      if (!(selected.blockIndex in this.selected)) {
        this.selected[selected.blockIndex] = new Set();
      }

      // Update the Set with what indexes are active.
      if (selected.selected) {
        this.selected[selected.blockIndex].add(selected.key);
      } else {
        this.selected[selected.blockIndex].delete(selected.key);
      }

      // Clean up the Set from any empty blocks.
      if (this.selected[selected.blockIndex].size === 0) {
        delete this.selected[selected.blockIndex];
      }
      console.log(this.selected);
    },
    answerSelected: function (index) {
      // Build an array of the indexes that need to be selected for this answer to be correct.
      const expectedSelectedIndex = {
        index: index,
        selectedBlocks: [
          ...Array(
            this.task.data[index].text.split(
              this.task.data[index].selectSplitChar
            ).length
          ).keys(),
        ],
      };

      // Build an array of the indexes that are selected for this answer.
      let selectedIndex = "null";
      if (Object.keys(this.selected).length == 1) {
        selectedIndex = {
          index: Number(Object.keys(this.selected)[0]),
          selectedBlocks: [...this.selected[index]].sort(),
        };
      }

      const correct =
        JSON.stringify(expectedSelectedIndex) === JSON.stringify(selectedIndex);

      console.log(expectedSelectedIndex);
      console.log(selectedIndex);

      console.log("same: " + correct);

      if (correct) {
        alert("Correct!");
      } else {
        alert("Incorrect, try again :(");
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
  background-color: rgb(240, 240, 240);;
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
