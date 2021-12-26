<template>
  <div id="app">
    <Task v-for="(task, taskIndex) in tasks" :task="task" :key="taskIndex" />
  </div>
</template>

<script>
import Task from "./components/Task.vue";

export default {
  name: "App",
  components: {
    Task,
  },
  data: function () {
    return {
      tasks: [
        {
          id: 0,
          description:
            "Example showing a regular matching task where each word is selected.",
          data: [
            {
              text: "בְּרֵאשִׁ֖ית",
              match: "In the begining",
              splitChar: " ",
            },
            {
              text: " ",
              match: null,
            },
            {
              text: "בָּרָ֣א אֱלֹהִ֑ים",
              match: "hashem created",
              splitChar: " ",
            },
            {
              text: " ",
              match: null,
            },
            {
              text: "אֵ֥ת הַשָּׁמַ֖יִם",
              match: "the heaven",
              splitChar: " ",
            },
            {
              text: " ",
              match: null,
            },
            {
              text: "וְאֵ֥ת הָאָֽרֶץ׃",
              match: "and the earth",
              splitChar: " ",
            },
          ],
        },
        {
          id: 1,
          description: "Example showing multi word select.",
          data: [
            {
              text: "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים",
              match: "First half of the pasuk",
            },
            {
              text: " ",
              match: null,
            },
            {
              text: "אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃",
              match: "Second half of the pasuk",
            },
          ],
        },
        {
          id: 2,
          description: "Line select, only some text is selectable.",
          data: [
            {
              text: "The first word of the Torah is",
            },
            {
              text: " _________ ",
              match: "בְּרֵאשִׁ֖ית",
            },
            {
              text: ". ",
            },
            {
              text: "The second word of the Torah is",
            },
            {
              text: " _________ ",
              match: "בָּרָ֣א",
            },
            {
              text: ". ",
            },
          ],
        },
        {
          id: 3,
          description: "How to make things hard by confusing students",
          data: [
            {
              text: "All of this text is selectable, but only ",
              match: null,
              splitChar: " ",
            },
            {
              text: "one",
              match: "Which one is it? 😈",
            },
            {
              text: " is the correct answer!",
              match: null,
              splitChar: " ",
            },
          ],
        },
        {
          id: 4,
          description: "Shoresh example 1",
          data: [
            {
              text: "בְּ",
              match: "Prefix",
            },
            {
              text: "רֵאשִׁ֖ית",
              match: "Word",
            },
          ],
        },
        {
          id: 5,
          description:
            "Shoresh example 2 (Does not work with nikud included due to unicode issues, but this can be corrected with grapheme splitting).",
          data: [
            {
              text: "ב",
              match: "Prefix",
              splitChar: "",
            },
            {
              text: "ראשית",
              match: "Word",
              splitChar: "",
            },
          ],
        },
        {
          id: 6,
          description:
            "My thoughts on formatting, see raw data for more context.",
          data: [
            {
              text: "Support for ",
            },
            {
              text: "bold",
              match: "BOLD!",
              style: {
                fontWeight: "900",
              },
            },
            {
              text: " or ",
            },
            {
              text: "italic",
              match: "italic",
              style: {
                fontStyle: "italic",
              },
            },
            {
              text: " text is possible and would not break this structure. ",
            },
            {
              text: "Maybe with some limitations...",
              // Possible way to handle style. If its formatted as valid CSS, it could be dropped into the span!
              style: {
                backgroundColor: "yellow",
                color: "red",
                padding: "5px",
                border: "1px solid black",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px black",
                fontSize: "10px",
              },
              splitChar: " ",
              match: "test",
            },
            {
              text: "The better version of this is to allow the user to allow pre made classes to be added to the block of text.",
              style: {
                fontSize: "10px",
              },
              splitChar: " ",
              match: "test",
            }
          ],
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
