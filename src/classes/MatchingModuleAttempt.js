export default class MatchingModuleAttempt {
    constructor(module) {
        this.module = module;
        this.selected = {};
    }

    /**
     * Action taken when user selects any selectable text.
     * This function keeps track of the selected text 
     * in preparation for checking if the selections match the answer.
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

    /**
     * Action taken when the user selects an answer. 
     * This function compares what the user has selected 
     * with the expected selection for the selected answer.
     * @param {*} index 
     */
    answerSelected(index) {
        const answerCorrect = this._objectsMatch(
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

    /**
     * Builds an  object representing the expected selected indexes (text) for a given answer.
     * @param {*} answerIndex 
     * @returns 
     */
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

    /**
     * Builds an object representing the currently selected indexes (text) for 
     * comparison with an object of expected indexes for the given answer.
     * @param {*} answerIndex 
     * @returns 
     */
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

    /**
     * Compares 2 objects to see if they match.
     * @param {*} object1 
     * @param {*} object2 
     * @returns 
     */
    _objectsMatch(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }
}