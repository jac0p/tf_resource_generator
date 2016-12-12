resource "vsphere_virtual_machine" "abc-prod-01" {
  name   = "abc-prod-01"
  folder = "ABC Prod"
  vcpu   = 4
  memory = 16384
  domain = "fun-place.com"
  dns_suffixes = ["fun-place.com"]
  dns_servers = ["192.168.51.11","10.10.11.11"]
  datacenter = "ABC-DEV"
  cluster = "ABC-DEF-Prod"
  time_zone = "America/New_York"

  network_interface {
      label = "PROD_INTF-DV"
      ipv4_address = "192.168.62.2"
      ipv4_prefix_length = "24"
      ipv4_gateway = "192.168.62.1"
  }

  disk {
    datastore = "DT_STR_PROD"
    template = "Templates/RHEL7"
    size = "40"
    type = "thin"
  }
}


resource "vsphere_virtual_machine" "abc-prod-02" {
  name   = "abc-prod-02"
  folder = "MACHINES Prod"
  vcpu   = 4
  memory = 16384
  domain = "fun-place.com"
  dns_suffixes = ["fun-place.com"]
  dns_servers = ["192.168.51.11","10.10.11.11"]
  datacenter = "ABC-DEV"
  cluster = "ABC-DEF-Prod"
  time_zone = "America/New_York"

  network_interface {
      label = "PROD_INTF-DV"
      ipv4_address = "192.168.62.3"
      ipv4_prefix_length = "24"
      ipv4_gateway = "192.168.62.1"
  }

  disk {
    datastore = "DT_STR_PROD"
    template = "Templates/RHEL7"
    size = "40"
    type = "thin"
  }
}

