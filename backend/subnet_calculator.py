import ipaddress

def perform_subnet_calculation(ip, subnet, subnet_mask):
    workings = []

    if not is_valid_ip(ip):
        raise ValueError("Invalid IP address")
    workings.append(f"Valid IP address: {ip}")

    if subnet is None and subnet_mask:
        try:
            subnet = ipaddress.IPv4Network(f"0.0.0.0/{subnet_mask}").prefixlen
            workings.append(f"Converted subnet mask {subnet_mask} to CIDR /{subnet}")
        except Exception:
            raise ValueError("Invalid subnet mask")

    if subnet is None:
        ip_class = get_ip_class(ip)
        workings.append(f"No CIDR provided; using default for Class {ip_class}")
        if ip_class == 'A':
            subnet = 8
        elif ip_class == 'B':
            subnet = 16
        elif ip_class == 'C':
            subnet = 24
        else:
            subnet = 24

    try:
        network = ipaddress.ip_network(f"{ip}/{subnet}", strict=False)
        hosts = list(network.hosts())
        usable_hosts = len(hosts)

        workings.append(f"IP/{subnet} gives network: {network.network_address}")
        workings.append(f"Subnet mask: {network.netmask}")
        workings.append(f"Wildcard mask (inverse): {network.hostmask}")
        workings.append(f"Broadcast address: {network.broadcast_address}")
        workings.append(f"Usable IPs: {hosts[0]} to {hosts[-1]} ({usable_hosts} usable)")
        workings.append(f"Total IPs (including net + broadcast): {network.num_addresses}")

        return {
            "ip": ip,
            "network": str(network.network_address),
            "subnet_mask": str(network.netmask),
            "CIDR": f"/{network.prefixlen}",
            "broadcast": str(network.broadcast_address),
            "first_usable": str(hosts[0]) if usable_hosts > 0 else None,
            "last_usable": str(hosts[-1]) if usable_hosts > 0 else None,
            "total_hosts": network.num_addresses,
            "usable_hosts": usable_hosts,
            "wildcard_mask": str(network.hostmask),
            "is_private": network.is_private,
            "ip_class": get_ip_class(ip),
            "workings": workings
        }

    except Exception:
        raise ValueError("Subnet calculation failed")


# Helper function to determine the IP class
def get_ip_class(ip):
    try:
        first_octet = int(ip.split('.')[0])  # Take the first part of IP address
        if 1 <= first_octet <= 126:
            return 'A'
        elif 128 <= first_octet <= 191:
            return 'B'
        elif 192 <= first_octet <= 223:
            return 'C'
        elif 224 <= first_octet <= 239:
            return 'D (Multicast)'
        elif 240 <= first_octet <= 254:
            return 'E (Experimental)'
        else:
            return 'Unknown'
    except:
        return 'Unknown'

# Helper function to check if a string is a valid IP address
def is_valid_ip(ip):
    try:
        ipaddress.ip_address(ip)  # Try parsing IP; will raise ValueError if invalid
        return True
    except ValueError:
        return False

