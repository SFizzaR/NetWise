import ipaddress
import math

def perform_vlsm_calculation(base_network, base_ip=None, host_requirements=[]):
    network = ipaddress.ip_network(base_network, strict=False)
    current_ip = ipaddress.IPv4Address(base_ip) if base_ip else network.network_address

    host_sizes = sorted(host_requirements, reverse=True)
    result = []

    for hosts in host_sizes:
        subnet_size = calculate_subnet_size(hosts)
        new_prefix = 32 - subnet_size

        subnet = ipaddress.ip_network(f"{current_ip}/{new_prefix}", strict=False)

        # Make sure subnet fits inside the base network
        if subnet.network_address < network.network_address or subnet.broadcast_address > network.broadcast_address:
            raise ValueError(f"Subnet {subnet} does not fit into the base network {network}")

        subnet_details = {
            "hostRequirement": hosts, 
            "subnet": str(subnet),
            "first_usable": str(subnet.network_address + 1),
            "last_usable": str(subnet.broadcast_address - 1),
            "total_hosts": subnet.num_addresses,
            "usable_hosts": subnet.num_addresses - 2,
            "broadcast": str(subnet.broadcast_address)
        }
        result.append(subnet_details)

        current_ip = subnet.broadcast_address + 1

    return {
        "base_network": str(network),
        "starting_ip": str(base_ip if base_ip else network.network_address),
        "host_requirement": list(host_requirements),
        "subnets": result
    }

def calculate_subnet_size(hosts):
    return math.ceil(math.log2(hosts + 2))
