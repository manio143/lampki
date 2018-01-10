const fs = require("mz/fs")
require("simple-enum")

exports.makeSession = (nick) => {
  let generateAll = () => {
    return Array.from(Array(1023), (x, i) => i+1);
  };
  return ({
    nick: nick,
    startedAt: new Date(),
    finishedAt: null,
    duration: 0,
    unseen: generateAll(),
    presses: {}
  });
}

exports.save = (session) => {
  let data = JSON.stringify(session);
  return fs.writeFile('./savedSession.json', data, "utf8")
}

exports.load = (file) => {
  file = file || './savedSession.json';
  return fs.readFile(file, "utf8").then(data => JSON.parse(data))
}

exports.archive = async () => {
  let old = await this.load();
  let data = JSON.stringify(old);
  if(!(await fs.exists('./previousSessions')))
    await fs.mkdir('./previousSessions');
  await fs.writeFile('./previousSessions/'+old.startedAt+'_'+old.nick+'.json', data, "utf8");
};

exports.exists = () => {
  return this.load().then(d => d.nick).catch(err => false);
}

exports.remove = () => {
  return fs.unlink('./savedSession.json');
}

exports.loadAll = async () => {
  let files = (await fs.readdir('./previousSessions')).map(v => './previousSessions/' + v);
  files.push('./savedSession.json');
  let sessions = [];
  for (var f of files) {
    sessions.push(await this.load(f));
  }
  sessions.sort((a, b) => a.startedAt - b.startedAt);
  return sessions;
}
