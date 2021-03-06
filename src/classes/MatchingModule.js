/**
 * A class representing each data for a matching module.
 */
class MatchingModuleQuestion {
    match = null;

    constructor(questionData) {
        this.text = questionData.text;
        this.match = questionData.match;
        this.splitChar = questionData.splitChar;
        this.style = questionData.style;
    }

    /**
     * Get the clickable portions of the question text.
     * @returns an array of strings.
     */
    getClickableStrings() {
        let clickableText = this._hasSplitChar() ?
            this.text.split(this.splitChar) : [this.text];

        // Append spaces (or other char) back to the end of each word.
        // This is for displaying the text correctly for the user.
        clickableText = clickableText.map((text) => {
            return text + (this._hasSplitChar() ? this.splitChar : "");
        });

        return clickableText;
    }

    _hasSplitChar() {
        return typeof this.splitChar == "string";
    }
}

/**
 * The base class for all matching modules.
 */
export default class MatchingModule {
    constructor(rawData) {
        this.id = rawData.id;
        this.questions = rawData.data.map(
            (questionData) => new MatchingModuleQuestion(questionData)
        );
    }
}