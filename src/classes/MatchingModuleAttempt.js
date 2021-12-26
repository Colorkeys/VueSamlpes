export default class MatchingModuleAttempt {
    constructor(module) {
        this.module = module;
        this.selected = {};
    }

    /**
     * User selected a word (or letter) on the question.
     * This is the action that registers each click and keeps track
     * of the users selection.
     * @param {selected, key, questionIndex} selected 
     */
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

    answerSelected(index) {
        const answerCorrect = this._selectionMatchesAnswer(
            this._getAnswerExpectedSelectedIndexes(index),
            this._getCurrentSelectedIndexes(index)
        )

        console.log("same: " + answerCorrect);

        // if (correct) {
        //     alert("Correct!");
        // } else {
        //     alert("Incorrect, try again :(");
        // }
    }

    _getAnswerExpectedSelectedIndexes(answerIndex) {
        const expectedSelectedIndex = {
            index: answerIndex,
            selectedBlocks: [
                ...Array(
                    this.module.questions[answerIndex].text.split(this.module.questions[answerIndex].splitChar)
                    .length
                ).keys(),
            ],
        };
        return expectedSelectedIndex;
    }

    _getCurrentSelectedIndexes(answerIndex) {
        let selectedIndex = "null";
        if (Object.keys(this.selected).length == 1) {
            selectedIndex = {
                index: Number(Object.keys(this.selected)[0]),
                selectedBlocks: [...this.selected[answerIndex]].sort(),
            };
        }
        return selectedIndex;
    }

    _selectionMatchesAnswer(selectedIndexes, answerExpectedIndexes) {
        return JSON.stringify(selectedIndexes) === JSON.stringify(answerExpectedIndexes);
    }
}