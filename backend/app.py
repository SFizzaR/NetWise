# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
from subnet_calculator import perform_subnet_calculation, get_ip_class, is_valid_ip 
from vlsm_calculator import perform_vlsm_calculation, calculate_subnet_size

# Create a Flask app instance
app = Flask(__name__)
CORS(app)

@app.route('/calculate_subnet', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Missing JSON body"}), 400

        ip = data.get("ip")
        subnet = data.get("subnet")
        subnet_mask = data.get("subnet_mask")

        if not ip:
            return jsonify({"error": "Missing IP address"}), 400

        result = perform_subnet_calculation(ip, subnet, subnet_mask)
        
        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/calculate_vlsm', methods=['POST'])
def vlsm():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Missing JSON body"}), 400

        base_network = data.get("base_network")
        host_requirements = data.get("host_requirements")
        base_ip = data.get("base_ip")

        if not base_network or not host_requirements or not base_ip:
            return jsonify({"error": "Both 'base_network', 'host_requirements', and 'base_ip' are required"}), 400

        result = perform_vlsm_calculation(base_network, base_ip, host_requirements)

        return jsonify(result), 200

    except ValueError as e:
        print(f"ValueError occurred: {e}")   # <-- ADD THIS
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        print(f"Exception occurred: {e}")    # <-- ADD THIS
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    app.run(debug=True)
