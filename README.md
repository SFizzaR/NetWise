
# 🌐 NetWise – Subnet Calculator & VLSM Tool

**NetWise** is an educational and practical subnet calculator designed for students, IT professionals, and network engineers. It simplifies IP address subnetting, validates input, visualizes results, and supports REST APIs for integration.


## ✨ Features ✨

- 🔢 **IPv4 Validation**: Ensures valid IP format and checks against IP class ranges.
- 🧮 **Subnet Mask & CIDR Support**: Accepts both dotted decimal and CIDR notation.
- 📡 **Network Address Calculation**: Performs bitwise AND between IP and subnet mask.
- 📤 **Broadcast Address Detection**: Computes the last address in the subnet range.
- 👥 **Usable Host Range Display**: Shows first and last usable IPs.
- 🎭 **Wildcard Mask Generator**: Converts subnet mask to wildcard format (useful in ACLs).
- 📈 **Host Count Calculation**: Displays total and usable IPs per subnet.
- 🔧 **VLSM Support**: Accepts multiple subnet size requirements and allocates efficiently.
- 🧠 **Step-by-Step Subnet/VLSM Logic**: Transparent breakdown of how results are derived.
- 📊 **Visual Subnet Representation**: Color-coded IP roles and subnet blocks for visual learners.
- 🌐 **Interactive Web UI**: User-friendly frontend built with React.
- 💻 **Java CLI Version**: Terminal-based tool for practice and testing logic.
- 🔌 **REST API Integration**: Endpoints available for key calculations.


## 🛠 Tech Stack

| Layer         | Technologies                 |
| ------------- | ---------------------------- |
| **Frontend**  | React, HTML, CSS, JavaScript |
| **Backend**   | Python (Flask), Java (CLI)   |
| **API**       | Flask REST API               |
| **Tools**     | VS Code, Thunder Client      |
| **Standards** | RFC 950, RFC 1519            |


## 🚀 Installation

### Web Version

```bash
git clone https://github.com/YourUsername/NetWise.git
cd NetWise/frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd ../backend
pip install -r requirements.txt
python app.py
```

## 🔮 Future Enhancements

- Integrated subnet planning calendar
- IPv6 support
- Export subnet reports to PDF/CSV
- Embedded learning modules (interactive subnetting quizzes)
- Cloud deployment with persistent user sessions

## 🖥️ UI Screenshots 
![Screenshot 2025-05-13 092130](https://github.com/user-attachments/assets/617d1037-d715-4f9d-b13f-9bdf1319cd9a)

![WhatsApp Image 2025-05-03 at 22 02 20_a1e4b4c0](https://github.com/user-attachments/assets/d9500766-8247-42b2-972a-5cd6fba6b294)

## 🤝 Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Open a pull request 
