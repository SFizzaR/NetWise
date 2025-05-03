import matplotlib.pyplot as plt
import ipaddress
import io

def visualize_vlsm_allocations(subnet_data):
    fig, ax = plt.subplots(figsize=(12, len(subnet_data) * 1))

    for i, subnet in enumerate(subnet_data):
        # Convert IP strings to integers safely
        start = int(ipaddress.IPv4Address(subnet['network_address']))
        end = int(ipaddress.IPv4Address(subnet['broadcast_address']))
        width = end - start + 1

        ax.barh(i, width, left=start, color="skyblue", edgecolor='black')
        label = f"{subnet['subnet']} ({subnet['usable_hosts']} hosts)"
        ax.text(start + width / 2, i, label, va='center', ha='center', fontsize=9, color='black')

    ax.set_yticks(range(len(subnet_data)))
    ax.set_yticklabels([f"Subnet {i + 1}" for i in range(len(subnet_data))])
    ax.set_xlabel("IP Address Range (Integer Representation)")
    ax.set_title("VLSM Subnet Allocation")
    ax.grid(True)
    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    return buf
