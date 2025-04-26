from flask import Flask, request, jsonify
import ipaddress
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    ip = data.get("ip")
    subnet = data.get("subnet")
    subnet_mask = data.get("subnet_mask")

    # Validate IP address
    if not is_valid_ip(ip):
        return jsonify({"error": "Invalid IP address"}), 400
    
    if subnet is None and subnet_mask:
        try:
            subnet = ipaddress.IPv4Network(f"0.0.0.0/{subnet_mask}").prefixlen
        except Exception as e:
            return jsonify({"error": f"Invalid subnet mask: {str(e)}"}), 400


    # Assign default subnet based on IP class if none is provided
    if subnet is None:
        ip_class = get_ip_class(ip)
        if ip_class == 'A':
            subnet = 8
        elif ip_class == 'B':
            subnet = 16
        elif ip_class == 'C':
            subnet = 24
        else:
            subnet = 24  # fallback

    try:
        network = ipaddress.ip_network(f"{ip}/{subnet}", strict=False)
        hosts = list(network.hosts())
        usable_hosts = len(hosts)


        return jsonify({
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
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_ip_class(ip):
    try:
        first_octet = int(ip.split('.')[0])
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

def is_valid_ip(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False

if __name__ == '__main__':
    app.run(debug=True)
