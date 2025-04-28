import ipaddress

def perform_subnet_calculation(ip, subnet, subnet_mask):
    # Validate if the IP is correctly formatted
    if not is_valid_ip(ip):
        raise ValueError("Invalid IP address")
    
    # If subnet (CIDR) is not provided but subnet mask is provided
    if subnet is None and subnet_mask:
        try:
            # Convert subnet mask like '255.255.255.0' to CIDR notation like '/24'
            subnet = ipaddress.IPv4Network(f"0.0.0.0/{subnet_mask}").prefixlen
        except Exception:
            raise ValueError("Invalid subnet mask")

    # If subnet is still None after trying above
    if subnet is None:
        # Deduce default subnet based on IP class
        ip_class = get_ip_class(ip)
        if ip_class == 'A':
            subnet = 8
        elif ip_class == 'B':
            subnet = 16
        elif ip_class == 'C':
            subnet = 24
        else:
            subnet = 24  # default fallback if unknown

    try:
        # Create a network object using the IP and subnet (not strict: allows host IPs, not just network IPs)
        network = ipaddress.ip_network(f"{ip}/{subnet}", strict=False)
        
        # Get all usable host IP addresses in the network
        hosts = list(network.hosts())
        usable_hosts = len(hosts)

        # Return a dictionary with all calculated fields
        return {
            "network": str(network.network_address),  # The network address
            "subnet_mask": str(network.netmask),      # Subnet mask (e.g., 255.255.255.0)
            "CIDR": f"/{network.prefixlen}",           # CIDR notation (e.g., /24)
            "broadcast": str(network.broadcast_address),  # Broadcast address
            "first_usable": str(hosts[0]) if usable_hosts > 0 else None,  # First usable host IP
            "last_usable": str(hosts[-1]) if usable_hosts > 0 else None,  # Last usable host IP
            "total_hosts": network.num_addresses,     # Total number of IPs (including network and broadcast)
            "usable_hosts": usable_hosts,              # Number of usable host IPs
            "wildcard_mask": str(network.hostmask),    # Wildcard mask (inverse of subnet mask)
            "is_private": network.is_private,          # True if IP is private (RFC1918 addresses)
            "ip_class": get_ip_class(ip),              # Class of IP (A, B, C, etc.)
        }
    
    except Exception:
        # If anything goes wrong during calculations
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

