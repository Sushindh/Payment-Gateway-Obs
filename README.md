# 💳 Payment Gateway - Observability Enabled

<div align="center">

![Payment Gateway](https://img.shields.io/badge/Payment-Gateway-blue?style=for-the-badge)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-Enabled-orange?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge)
![Grafana](https://img.shields.io/badge/Grafana-Visualization-orange?style=for-the-badge)

*A full-stack payment gateway system with comprehensive observability using OpenTelemetry*

</div>

---

## 📋 Table of Contents

- [🎯 Purpose](#-purpose)
- [🌟 Impact](#-impact)
- [📖 What is Observability?](#-what-is-observability)
- [🏗️ Architecture](#️-architecture)
- [🗂️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Features](#️-features)
- [📊 Grafana Dashboards](#-grafana-dashboards)
- [🔔 Alerts Configuration](#-alerts-configuration)
- [🛠️ Tech Stack](#️-tech-stack)
- [📜 License](#-license)

---

## 🎯 Purpose

This project demonstrates a **production-ready payment gateway** system with comprehensive observability instrumentation. Built with **FastAPI** (backend) and **React.js** (frontend), it showcases:

- **End-to-end observability** using open-source tools
- **OpenTelemetry** integration for metrics, logs, and traces
- **Real-time monitoring** with Grafana, Prometheus, Loki, and Tempo
- **Industry-standard practices** for distributed system monitoring

---

## 🌟 Impact

| Feature | Benefit |
|---------|---------|
| 🔍 **Performance Monitoring** | Identify bottlenecks and optimize system performance |
| 🚨 **Error Detection** | Trace errors with high granularity across services |
| 📊 **Real-time Insights** | Monitor system health with live dashboards |
| 📈 **Scalability Planning** | Data-driven capacity planning and resource allocation |
| 🔧 **DevOps Excellence** | Industry-grade observability practices |

---

## 📖 What is Observability?

Observability is the ability to **measure the internal state** of a system by examining its outputs. It enables developers and operators to understand system behavior and troubleshoot issues effectively.

### 🔍 The Three Pillars of Observability

<table>
<tr>
<td align="center">

### 📊 **Metrics**
*Quantitative measurements*

- Request count
- Response times
- CPU/Memory usage
- Error rates

</td>
<td align="center">

### 📝 **Logs**
*Textual event records*

- Application events
- Error messages
- Debug information
- Audit trails

</td>
<td align="center">

### 🔗 **Traces**
*Request journey tracking*

- Distributed tracing
- Service interactions
- Latency breakdown
- Performance insights

</td>
</tr>
</table>

---

## 🏗️ Architecture

```mermaid
graph TB
    A[React Frontend] -->|HTTP Requests| B[FastAPI Backend]
    B -->|OpenTelemetry| C[Grafana Alloy]
    B -->|Data Storage| D[MongoDB]
    
    C -->|Metrics| E[Prometheus]
    C -->|Logs| F[Loki]
    C -->|Traces| G[Tempo]
    
    E --> H[Grafana]
    F --> H
    G --> H
    
    H -->|Alerts| I[Alert Manager]

🗂️ Project Structure
Payment-Gateway-Obs/
│
├── 🐳 docker-compose.yaml          # Multi-service orchestration
├── ⚙️ config.alloy                # Grafana Alloy configuration
├── 📊 prometheus.yml              # Prometheus configuration
├── 🔍 tempo.yaml                  # Tempo configuration
│
├── 🖥️ server/                      # FastAPI Backend
│   ├── 🐳 Dockerfile
│   ├── 🚀 main.py                 # Application entry point
│   ├── 💾 databases.py            # Database configuration
│   ├── 📋 schemas.py              # Pydantic models
│   ├── 📦 requirements.txt        # Python dependencies
│   └── 🔗 routers/
│       ├── 💳 payment.py          # Payment processing
│       ├── 📊 transactions.py     # Transaction management
│       ├── 👥 admin.py            # Admin operations
│       └── 🔍 checkMongo.py       # Database health checks
│
└── 🎨 client/                      # React Frontend
    ├── 📁 src/
    ├── 📦 package.json
    └── ⚙️ vite.config.js

🚀 Getting Started
Prerequisites

🐳 Docker and Docker Compose
💻 Git
🌐 Web Browser

Installation Steps

Clone the Repository
bashgit clone https://github.com/your-username/Payment-Gateway-Obs.git
cd Payment-Gateway-Obs

Create Required Directories
bashmkdir -p server/routers/logs

Launch the Stack
bashdocker-compose up --build

Verify Services
Wait for all services to start, then access:

🌐 Service URLs
ServiceURLPurpose🎨 Frontendhttp://localhost:5173React UI🔧 Backend APIhttp://localhost:8000FastAPI endpoints📊 Grafanahttp://localhost:3000Dashboards & visualization📈 Prometheushttp://localhost:9091Metrics collection🔍 Tempohttp://localhost:3200Distributed tracing📜 Lokihttp://localhost:3100Log aggregation

Default Grafana Credentials: admin / admin


⚙️ Features
🔗 API Endpoints
MethodEndpointDescriptionObservability FeaturesPOST/paymentProcess payment transactions✅ Metrics, Logs, TracesGET/transactionsRetrieve transaction history✅ Performance monitoringPOST/adminSimulate error scenarios✅ Error trackingGET/admin/healthSystem health check✅ Availability metrics
📊 Observability Features
<table>
<tr>
<td>
📈 Metrics Collection

Request count and rates
Response time percentiles
Error rates by endpoint
System resource usage
Custom business metrics

</td>
<td>
📝 Structured Logging

Request/response logging
Error context capture
Performance markers
Business event tracking
Correlation IDs

</td>
<td>
🔗 Distributed Tracing

End-to-end request tracking
Service dependency mapping
Latency breakdown analysis
Error propagation tracing
Performance bottleneck identification

</td>
</tr>
</table>

📊 Grafana Dashboards
Available Dashboards

🎯 Application Performance Monitoring (APM)

Request throughput and latency
Error rates and success metrics
Service health indicators


🔍 Distributed Tracing

Request flow visualization
Service dependency graphs
Latency heatmaps


📊 Infrastructure Monitoring

System resource utilization
Database performance
Container metrics


🚨 Error Analysis

Error rate trends
Exception tracking
Failure pattern analysis



Sample Visualizations

📈 Request Rate: Real-time API call frequency
⏱️ Response Time: P50, P95, P99 latency percentiles
🚨 Error Rate: 4xx and 5xx error percentages
🔄 Transaction Volume: Payment processing metrics


🔔 Alerts Configuration
Predefined Alert Rules
AlertConditionSeverity🚨 High Error RateError rate > 5% for 5 minutesCritical🐌 Slow ResponseP95 latency > 1000ms for 2 minutesWarning📉 Low Transaction VolumeTransaction rate < 10/hourWarning💾 Database ConnectionMongoDB connection failuresCritical🔧 Service UnavailableHealth check failuresCritical
Alert Channels

📧 Email notifications
💬 Slack integration
📱 PagerDuty escalation


🛠️ Tech Stack
Backend

🚀 FastAPI - High-performance Python web framework
🔍 OpenTelemetry - Observability instrumentation
💾 MongoDB - Document database
📊 Pydantic - Data validation and serialization

Frontend

⚛️ React.js - UI framework
⚡ Vite - Build tool and dev server
🎨 Modern CSS - Responsive design

Observability Stack

📊 Grafana - Visualization and dashboards
📈 Prometheus - Metrics collection and alerting
📜 Loki - Log aggregation
🔍 Tempo - Distributed tracing
🔄 Grafana Alloy - Telemetry collection agent

Infrastructure

🐳 Docker - Containerization
🔧 Docker Compose - Multi-service orchestration


🤝 Contributing
We welcome contributions! Please see our Contributing Guidelines for details.

Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request


📞 Support

📖 Documentation: Check the /docs directory
🐛 Issues: Report bugs via GitHub Issues
💬 Discussions: Join our community discussions
📧 Contact: your-email@example.com


📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
⭐ Star this repository if you find it helpful!
Made with ❤️ by Your Name
</div>
```
