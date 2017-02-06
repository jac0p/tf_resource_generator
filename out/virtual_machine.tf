
resource "vsphere_virtual_machine" "abc-prod-01.fancycompany-name.com" {
  name   = "abc-prod-01.fancycompany-name.com"
  folder = "New Machines"
  vcpu   = 4
  memory = 16
  domain = "fancy-dom.com"
  dns_suffixes = [fancy-dom.com]
  dns_servers = ["192.168.51.11","10.10.11.11"]
  datacenter = "ABC-DEV"
  cluster = "ABC-DEF-Prod"
  time_zone = "America/New_York"

  network_interface {
      label = "N01_PROTOCOL"
      ipv4_address = "192.168.56.2"
      ipv4_prefix_length = "24" ipv4_gateway = "192.168.56.1"
  } 

  disk {
    datastore = "Templates/RHEL7"
    template = "undefined"
    size = "500"
    type = "thin"
  }
}

resource "vsphere_virtual_machine" "abc-prod-02.fancycompany-name.com" {
  name   = "abc-prod-02.fancycompany-name.com"
  folder = "New Machines"
  vcpu   = 4
  memory = 16
  domain = "fancy-dom.com"
  dns_suffixes = [fancy-dom.com]
  dns_servers = ["192.168.51.11","10.10.11.11"]
  datacenter = "ABC-DEV"
  cluster = "ABC-DEF-Prod"
  time_zone = "America/New_York"

  network_interface {
      label = "N01_PROTOCOL"
      ipv4_address = "192.168.56.3"
      ipv4_prefix_length = "24" ipv4_gateway = "192.168.56.1"
  } 

  disk {
    datastore = "Templates/RHEL7"
    template = "undefined"
    size = "500"
    type = "thin"
  }
}

resource "vsphere_virtual_machine" "abc-prod-03.fancycompany-name.com" {
  name   = "abc-prod-03.fancycompany-name.com"
  folder = "New Machines"
  vcpu   = 4
  memory = 16
  domain = "fancy-dom.com"
  dns_suffixes = [fancy-dom.com]
  dns_servers = ["192.168.51.11","10.10.11.11"]
  datacenter = "ABC-DEV"
  cluster = "ABC-DEF-Prod"
  time_zone = "America/New_York"

  network_interface {
      label = "N01_PROTOCOL"
      ipv4_address = "192.168.56.4"
      ipv4_prefix_length = "24" ipv4_gateway = "192.168.56.1"
  } 

  disk {
    datastore = "Templates/RHEL7"
    template = "undefined"
    size = "500"
    type = "thin"
  }
}
