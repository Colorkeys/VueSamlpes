export default class MatchingModuleAttempt {
    constructor(module) {
        this.module = module;
        this.selected = {};
    }

    selectableClicked(selected) {
        // Add a Set if one does not exist for this block.
        if (!(selected.questionIndex in this.selected)) {
            this.selected[selected.questionIndex] = new Set();
        }

        // Update the Set with what indexes are active.
        if (selected.selected) {
            this.selected[selected.questionIndex].add(selected.key);
        } else {
            this.selected[selected.questionIndex].delete(selected.key);
        }

        // Clean up the Set from any empty blocks.
        if (this.selected[selected.questionIndex].size === 0) {
            delete this.selected[selected.questionIndex];
        }
    }
}