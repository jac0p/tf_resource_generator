// imports
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const fs = require('fs');


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
const headers = ["hostname", "cpu", "memory", "disk", "network_adapter", "ip", "gateway", "domain", "folder", "datacenter", "cluster",  "datastore", "template" ];

function createPostDestroy(properties) {
  var stream = fs.createWriteStream("out/post-destroy");

  stream.once('open', function(fd) {
    stream.write("#!/bin/bash\n\n");
    for (i = 0; i < properties.length; i++) { 
      var hostname = properties[i]["hostname"];
      var ip = properties[i]["ip"];
      console.log(`Adding machine: ${hostname}, with IP: ${ip}`);
      stream.write("ssh-keygen -f ~/.ssh/known_hosts -R " + hostname + "\n");
      stream.write("ssh-keygen -f ~/.ssh/known_hosts -R " + ip + "\n");
    }
    stream.end();
  });
}


function createVirtualMachineTF(properties) {
  var stream = fs.createWriteStream("out/virtual_machine.tf");

  stream.once('open', function(fd) {
    for (i = 0; i < properties.length; i++) { 
      var host = properties[i];
      var hostname = properties[i]["hostname"];
      var ip = properties[i]["ip"];
      console.log(`Adding machine: ${hostname}, with IP: ${ip}`);
      
      var o = 
        "\nresource \"vsphere_virtual_machine\" \"" + hostname + "\" {\n  name   = \"" + hostname + "\"\n  folder = \"" + host["folder"] + "\"\n  vcpu   = " + host["cpu"] + "\n  memory = " + host["memory"] + "\n  domain = \"" + host["domain"] + "\"\n  dns_suffixes = [\"" + host["domain"] + "\"]\n  dns_servers = [\"192.168.51.11\",\"10.10.11.11\"]\n  datacenter = \"" + host["datacenter"] + "\"\n  cluster = \"" + host["cluster"] + "\"\n  time_zone = \"America/New_York\"\n\n  network_interface {\n      label = \"" + host["network_adapter"] + "\"\n      ipv4_address = \"" + host["ip"] + "\"\n      ipv4_prefix_length = \"24\"\n      ipv4_gateway = \"" + host["gateway"] + "\"\n  } \n\n  disk {\n    datastore = \"" + host["datastore"] + "\"\n    template = \"" + host["template"] + "\"\n    size = \"" + host["disk"] + "\"\n    type = \"thin\"\n  }\n}\n";

    stream.write(o);
    }
    stream.end();
  });
}


function assocMachine(properties) {
  o = {};
  for (i = 0; i < headers.length; i++) { o[headers[i]] = properties[i]; }
  return o;
}


function parseConfig(config) {
  var machines = [];
  var data = fs.readFileSync(config);
  var lines = data.toString().split('\n');

  for (i = 0; i < (lines.length - 1); i++) {
    var properties = lines[i].toString().split(',');
    machines.push(properties)
  }

  machines = machines.map(assocMachine);
  return machines;
}


function main() {
  if (options["config"] == undefined || options["help"] == true) {
    console.log(getUsage(sections));
  } else {
    console.log("Parsing configuration.")
    var machineProperties = parseConfig(options["config"]);
    console.log("Creating post-destroy file.");
    createPostDestroy(machineProperties);
    createVirtualMachineTF(machineProperties);
  } 
}

main();

