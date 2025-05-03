# Import necessary libraries
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from subnet_calculator import perform_subnet_calculation, get_ip_class, is_valid_ip 
from vlsm_calculator import perform_vlsm_calculation, calculate_subnet_size
from vlsmvisualization import visualize_vlsm_allocations
from subnet_working import explain_subnetting
from vlsm_working import vlsm_steps

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
        print(f"ValueError occurred: {e}")  
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        print(f"Exception occurred: {e}")   
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/subnet-working', methods=['POST'])
def subnet_working():
    data = request.get_json()
    ip = data.get('ip')
    cidr = data.get('cidr')
    subnet_mask = data.get('subnet_mask')

    try:
        steps = explain_subnetting(ip, cidr=cidr, subnet_mask=subnet_mask)
        return jsonify({'steps': steps})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/vlsm-working', methods=['POST'])
def vlsm_working():
    data = request.get_json()
    base_network = data.get('base_network')
    base_ip = data.get('base_ip')
    host_requirements = data.get('host_requirements')

    try:
        steps = vlsm_steps(base_network=base_network, base_ip=base_ip,host_requirements=host_requirements )
        return jsonify({'steps': steps})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/visualization', methods=['POST'])
def generate_plot():
    try:
        data = request.get_json()
        subnet_data = data.get('subnet_data')
        if not subnet_data:
            return jsonify({"error": "Missing subnet_data"}), 400

        img_buf = visualize_vlsm_allocations(subnet_data)
        return send_file(img_buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
