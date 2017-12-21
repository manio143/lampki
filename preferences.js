const fs = require("mz/fs")
require("simple-enum")

exports.enums = {
  experimentType: Enum("feedback", "noFeedback"),
  delayType: Enum("constant", "afterLast"),
}

let makeDefault = () => {
  return ({
    delay: 3000, //milliseconds
    delayType: exports.enums.delayType.constant,
    experimentType: exports.enums.experimentType.feedback,
    delayBeforeNext: 1500, //milliseconds
  });
}

exports.save = (preferences) => {
  let data = JSON.stringify(preferences);
  return fs.writeFile('./preferences.json', data, "utf8");
}

exports.load = () => {
  return fs.readFile('./preferences.json', "utf8").then(data => JSON.parse(data))
    .catch(err => {
      console.log("Preferences file not found - generating default...");
      p = makeDefault();
      this.save(p);
      return p;
    });
}

exports.log = (p) => {
  console.log("Preferences.Delay: " + p.delay + "ms");
  console.log("Preferences.DelayType: " + this.enums.delayType.keys[p.delayType]);
  console.log("Preferences.ExperimentType: " + this.enums.experimentType.keys[p.experimentType]);
  console.log("Preferences.DelayBeforeNext: " + p.delayBeforeNext + "ms");
}
