import ipaddress

def explain_subnetting(ip, cidr=None, subnet_mask=None):
    steps = []

    # Step 1: Determine subnet bits
    steps.append("Step 1: Determine Subnet Bits")
    if subnet_mask:
        network = ipaddress.IPv4Network(f"{ip}/{subnet_mask}", strict=False)
        cidr = network.prefixlen
        steps.append(f"   └ Given Subnet Mask: {subnet_mask}")
        steps.append(f"   └ Converted to CIDR: Count the 1s → /{cidr}")
    elif cidr is not None:
        network = ipaddress.IPv4Network(f"{ip}/{cidr}", strict=False)
        subnet_mask = str(network.netmask)
        steps.append(f"   └ Given CIDR: /{cidr}")
        steps.append(f"   └ Subnet Mask = {subnet_mask} (based on {cidr} bits set to 1)")
    else:
        raise ValueError("Either CIDR or Subnet Mask is required.")

    # Step 2: Determine the class and default subnet bits
    first_octet = int(ip.split('.')[0])
    if 1 <= first_octet <= 126:
        ip_class = 'A'
        default_cidr = 8
    elif 128 <= first_octet <= 191:
        ip_class = 'B'
        default_cidr = 16
    elif 192 <= first_octet <= 223:
        ip_class = 'C'
        default_cidr = 24
    else:
        ip_class = 'Unknown'
        default_cidr = None

    steps.append("\nStep 2: IP Class and Borrowed Bits")
    steps.append(f"   └ IP Class Based on First Octet ({first_octet}): Class {ip_class}")
    if default_cidr and cidr > default_cidr:
        borrowed = cidr - default_cidr
        steps.append(f"   └ Default Prefix for Class {ip_class}: /{default_cidr}")
        steps.append(f"   └ Bits Borrowed from Host Portion: {borrowed} bits")

    # Step 3: Network Address
    steps.append("\nStep 3: Network Address")
    steps.append(f"   └ Bitwise AND between IP and Subnet Mask:")
    steps.append(f"   └ Resulting Network Address: {network.network_address}")

    # Step 4: Wildcard Mask
    wildcard_mask = str(network.hostmask)
    steps.append("\nStep 4: Wildcard Mask (Inverse of Subnet Mask)")
    steps.append(f"   └ Subnet Mask: {subnet_mask}")
    steps.append(f"   └ Wildcard Mask: {wildcard_mask}")

    # Step 5: Broadcast Address
    steps.append("\nStep 5: Broadcast Address")
    steps.append(f"   └ Set all host bits to 1 in the network address")
    steps.append(f"   └ Broadcast Address: {network.broadcast_address}")

    # Step 6: Usable IPs
    hosts = list(network.hosts())
    total = network.num_addresses
    usable = len(hosts)
    steps.append("\nStep 6: Usable IPs")
    steps.append(f"   └ Total IPs: 2^({32 - cidr}) = {total}")
    steps.append(f"   └ Usable IPs: {total} - 2 (network & broadcast) = {usable}")
    if usable >= 2:
        steps.append(f"   └ First Usable IP: {hosts[0]}")
        steps.append(f"   └ Last Usable IP: {hosts[-1]}")
    else:
        steps.append("   └ No usable IPs in this subnet")

    return steps
