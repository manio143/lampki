const fs = require("mz/fs")
require("simple-enum")

exports.makeSession = (nick) => {
  let generateAll = () => {
    return Array.from(Array(1023), (x, i) => i+1);
  };
  return ({
    nick: nick,
    startedAt: new Date(),
    duration: null,
    unseen: generateAll(),
    presses: {}
  });
}

exports.save = (session) => {
  let data = JSON.stringify(session);
  return fs.writeFile('./savedSession.json', data, "utf8")
}

exports.load = () => {
  return fs.readFile('./savedSession.json', "utf8").then(data => JSON.parse(data))
}

exports.exists = () => {
  return this.load().then(d => d.nick).catch(err => false);
}

exports.remove = () => {
  return fs.unlink('./savedSession.json');
}
