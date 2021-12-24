<template>
  <span
    class="selectable"
    :class="{ selected: selected }"
    @click="click"
    v-bind:style="styling"
    >{{ str }}</span
  >
</template>

<script>
export default {
  name: "SelectableText",
  props: {
    str: String,
    qIndex: Number,
    styling: Object,
  },
  data: function () {
    return {
      selected: false,
    };
  },
  methods: {
    click: function () {
      this.selected = !this.selected;
      this.$emit("clicked", {
        selected: this.selected,
        key: this.$vnode.key,
        questionIndex: this.qIndex,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selectable:hover {
  cursor: pointer;
  color: blueviolet;
}

.selected {
  color: #04aa6d;
}
</style>
