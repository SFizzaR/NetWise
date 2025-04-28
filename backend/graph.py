import matplotlib.pyplot as plt
import ipaddress

# Create a subnet based on the given network and CIDR
network = ipaddress.IPv4Network("192.168.1.0/26", strict=False)

# Extract network properties
network_address = str(network.network_address)
subnet_mask = str(network.netmask)
broadcast_address = str(network.broadcast_address)
usable_addresses = list(network.hosts())

# Create a list of the x-axis labels (IP addresses)
x_labels = [str(network.network_address)] + [str(ip) for ip in usable_addresses] + [str(network.broadcast_address)]

# Create a list for y-values (status: network, usable, broadcast)
y_values = ["Network"] + ["Usable" for _ in usable_addresses] + ["Broadcast"]

# Assign numerical values to categories for better visualization
y_num_values = [0] + [1 for _ in usable_addresses] + [2]

# Plot the visualization
plt.figure(figsize=(10, 6))
plt.scatter(x_labels, y_num_values, c=y_num_values, cmap='coolwarm', s=100, edgecolors="black")

# Annotate the plot with labels
for i, label in enumerate(x_labels):
    plt.annotate(label, (x_labels[i], y_num_values[i]), textcoords="offset points", xytext=(0, 10), ha='center')

# Customize the plot
plt.xticks(rotation=90)  # Rotate IP addresses for better readability
plt.yticks([0, 1, 2], ["Network", "Usable", "Broadcast"])
plt.title(f"Subnet Visualization: {network_address}/{network.prefixlen}")
plt.xlabel("IP Addresses")
plt.ylabel("Status")
plt.grid(True)

# Show the plot
plt.tight_layout()
plt.show()
