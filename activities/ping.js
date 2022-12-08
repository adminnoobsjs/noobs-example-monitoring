const util = require('util');
const createRequire = require('module');

const exec = util.promisify(require('child_process').exec);

const ping = async (host) => {
  const {stdout, stderr} = await exec(`ping -c 1 ${host}`);
  console.log(stdout);
  console.log(stderr);
}

const wget = async (host) => {
    const {stdout, stderr} = await exec(`wget ${host}`);
    console.log(stdout);
    console.log(stderr);
}


ping('www.google.com');
wget('www.google.com');

