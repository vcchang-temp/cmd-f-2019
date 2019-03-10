let constants = require("./constants");
const { offensiveWords, explanations, replacements } = constants;

/** Main functionality for inclusive-language text checker */

// Returns an array of words without punctuation at the start and end of strings
function parse(input) {
    let wordsWithoutPunctuation = removePunctuation(input);

    let wordsSplitBySpaces = wordsWithoutPunctuation.split(" ");

    let finalWords = removeEmptyStrings(wordsSplitBySpaces);
    return finalWords;
}

function removePunctuation(input) {
    return input.replace(/\b[-.,()&$#!\[\]{}"']+\B|\B[-.,()&$#!\[\]{}"']+\b/g, "");
}

function removeEmptyStrings(input) {
    return input.filter(word => word !== "");
}

/*
    Returns an array of offensive words
*/
function detectOffensiveWords(allWords) {
  const detectedWords = [];

  allWords.forEach(word => {
    if (offensiveWords.hasOwnProperty(word)) {
      detectedWords.push(word);
    }
  });

  return detectedWords;
}

/*
    Returns a string of the explanation for why a word is offensive
*/
function getExplanation(word) {
  if (offensiveWords.hasOwnProperty(word)) {
    const index = offensiveWords[word][0];
    return explanations[index];
  }

  return "";
}

/*
    Returns a string to display suggested replacements for an offensive word
*/
function getSuggestionText(word) {
  if (offensiveWords.hasOwnProperty(word)) {
    const index = offensiveWords[word][1];
    const suggestedReplacements = replacements[index];

    return (
      "Try using these more inclusive terms instead:\n" +
      suggestedReplacements.join(", ")
    );
  }

  return "";
}


// Tests for parse
let example = "I will print all these ,words and n0mber-5, shesaid!";
let example2 = ".wrods!";
let example3 = " y.   use";

let parsedOutput = parse(example);
let parsedOutput2 = parse(example2);
let parsedOutput3 = parse(example3);
console.log(parsedOutput);
console.log(parsedOutput2);
console.log(parsedOutput3);
parsedOutput.forEach(word => console.log(word));

// Tests for offensive word detection
console.log(detectOffensiveWords(parsedOutput));
console.log(getExplanation("bossy"));
console.log(getSuggestionText("bossy"));