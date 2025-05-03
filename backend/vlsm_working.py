import ipaddress
import math

def vlsm_steps(base_network, base_ip, host_requirements):
    network = ipaddress.ip_network(base_network, strict=False)
    current_ip = ipaddress.IPv4Address(base_ip)
    host_sizes = sorted(host_requirements, reverse=True)

    steps = []

    steps.append(f"Base Network: {network}")
    steps.append(f"Starting IP Allocation From: {current_ip}")
    steps.append(f"Sorted Host Requirements (Descending): {host_sizes}\n")

    for index, hosts in enumerate(host_sizes, 1):
        step_lines = []
        step_lines.append(f"Subnet {index}")
        step_lines.append(f"   └ Requested Hosts: {hosts}")

        subnet_bits = calculate_subnet_size(hosts)
        new_prefix = 32 - subnet_bits
        total_ips = 2 ** subnet_bits
        usable_ips = total_ips - 2

        step_lines.append(f"   └ Needed Bits: ceil(log2({hosts} + 2)) = {subnet_bits}")
        step_lines.append(f"   └ Subnet Prefix: /{new_prefix}")
        step_lines.append(f"   └ Total IPs: 2^{subnet_bits} = {total_ips}")
        step_lines.append(f"   └ Usable IPs: {total_ips} - 2 = {usable_ips}")

        subnet = ipaddress.ip_network(f"{current_ip}/{new_prefix}", strict=False)
        if subnet.network_address < network.network_address or subnet.broadcast_address > network.broadcast_address:
            raise ValueError(f"Subnet {subnet} does not fit into base network {network}")

        step_lines.append(f"   └ Assigned Subnet: {subnet}")
        step_lines.append(f"   └ First Usable IP: {subnet.network_address + 1}")
        step_lines.append(f"   └ Last Usable IP: {subnet.broadcast_address - 1}")
        step_lines.append(f"   └ Broadcast Address: {subnet.broadcast_address}")
        step_lines.append(f"   └ Next IP Starts From: {subnet.broadcast_address + 1}\n")

        steps.extend(step_lines)
        current_ip = subnet.broadcast_address + 1

    return steps

def calculate_subnet_size(hosts):
    return math.ceil(math.log2(hosts + 2))
