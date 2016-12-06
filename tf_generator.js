// imports
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage')
const header = require('./ascii-header')
const ansi = require('ansi-escape-sequences')


// CLI fun
const optionDefinitions = [
  { name: 'config', type: String, defaultOption: true },
  { name: 'help', alias: 'h', type: Boolean }
]

const options = commandLineArgs(optionDefinitions)

const sections = [
  {
    raw: true
  },
  {
    header: 'TERRAFORM Resource Generator',
    content: [
      '$ node tf_generator.js [bold]{--config} [underline]{file}',
      '$ node tf_generator.js [bold]{--help}'
    ]
  }
]

// CSV "header"
const headers = ["hostname", "cpu", "memory", "disk", "network_adapter", "ip"];


function parseConfig(config) {
  return config;

}


function main() {
  if (options["config"] == undefined || options["help"] == true) {
    console.log(getUsage(sections));
  } else {
    var machines = parseConfig(options["config"]);
    console.log(machines)
  } 
}

main();
