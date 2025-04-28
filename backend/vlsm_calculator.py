import ipaddress
import math

def perform_vlsm_calculation(base_network, base_ip, host_requirements):
    network = ipaddress.ip_network(base_network, strict=False)
    current_ip = ipaddress.IPv4Address(base_ip)

    host_sizes = sorted(host_requirements, reverse=True)

    result = []

    for hosts in host_sizes:
        subnet_size = calculate_subnet_size(hosts)
        new_prefix = 32 - subnet_size

        # Find a subnet starting from current_ip with new_prefix
        possible_subnets = list(ipaddress.ip_network(f"{current_ip}/{new_prefix}", strict=False).subnets(new_prefix=new_prefix))
        subnet = None

        # Find the first subnet that contains the current_ip
        for s in possible_subnets:
            if current_ip >= s.network_address and current_ip <= s.broadcast_address:
                subnet = s
                break
        
        if subnet is None:
            subnet = ipaddress.ip_network(f"{current_ip}/{new_prefix}", strict=False)

        # Make sure subnet fits inside the base network
        if subnet.network_address not in network or subnet.broadcast_address not in network:
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

        # Move to the next IP after current subnet
        current_ip = subnet.broadcast_address + 1

    return result

def calculate_subnet_size(hosts):
    return math.ceil(math.log2(hosts + 2))
