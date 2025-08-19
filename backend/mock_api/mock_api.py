from flask import Flask, jsonify
import datetime

app = Flask(__name__)

# Dados Fictícios para o Painel de Saúde da Rede
def get_health_status_data():
    return [
        {
            "customerId": "cliente-001",
            "customerName": "João da Silva",
            "deviceId": "MAC-AABBCC112233",
            "status": "Muito Grave",
            "statusCode": 3,
            "summary": "Roteador offline desde 18/08/2025 10:30. Nenhuma resposta ao ping.",
            "recommendation": "Verificar se o equipamento está ligado na energia. Se estiver, enviar técnico.",
            "lastCheck": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-001"
        },
        {
            "customerId": "cliente-002",
            "customerName": "Maria Oliveira",
            "deviceId": "MAC-AABBCC445566",
            "status": "Grave",
            "statusCode": 2,
            "summary": "IA detectou alta latência (picos de 150ms) e 5% de perda de pacotes para o DNS primário.",
            "recommendation": "Executar teste de rota remoto e verificar saturação de banda do cliente.",
            "lastCheck": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-002"
        },
        {
            "customerId": "cliente-003",
            "customerName": "Pedro Martins",
            "deviceId": "MAC-AABBCC778899",
            "status": "Moderado",
            "statusCode": 1,
            "summary": "O número de dispositivos conectados (18) excede o recomendado (15) para este modelo de roteador.",
            "recommendation": "Entrar em contato com o cliente para oferecer um upgrade de equipamento.",
            "lastCheck": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-003"
        },
        {
            "customerId": "cliente-004",
            "customerName": "Ana Clara",
            "deviceId": "MAC-AABBCC101112",
            "status": "Sem problemas",
            "statusCode": 0,
            "summary": "Todos os parâmetros estão dentro da normalidade.",
            "recommendation": "Nenhuma ação necessária.",
            "lastCheck": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-004"
        }
    ]

# Dados Fictícios para o Painel de Risco de Churn
def get_churn_risk_data():
    return [
        {
            "customerId": "cliente-087",
            "customerName": "Carlos Pereira",
            "churnRiskScore": 92,
            "riskLevel": "Alto",
            "keyFactors": ["Uso de banda abaixo do contratado", "Múltiplas quedas de PPPoE"],
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-087"
        },
        {
            "customerId": "cliente-015",
            "customerName": "Ana Costa",
            "churnRiskScore": 65,
            "riskLevel": "Médio",
            "keyFactors": ["Latência instável em horários de pico"],
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-015"
        },
        {
            "customerId": "cliente-050",
            "customerName": "Mariana Ferreira",
            "churnRiskScore": 21,
            "riskLevel": "Baixo",
            "keyFactors": ["Uso consistente", "Feedback positivo no último contato"],
            "detailsLink": "/d/dashboard-detalhado?orgId=1&var-customer=cliente-050"
        }
    ]

# Endpoint para o Painel 1
@app.route('/api/health-status')
def health_status():
    data = get_health_status_data()
    # A API já retorna os dados ordenados por statusCode, do maior para o menor.
    sorted_data = sorted(data, key=lambda x: x['statusCode'], reverse=True)
    return jsonify(sorted_data)

# Endpoint para o Painel 2
@app.route('/api/churn-risk')
def churn_risk():
    data = get_churn_risk_data()
    # Ordenado por score de risco, do maior para o menor.
    sorted_data = sorted(data, key=lambda x: x['churnRiskScore'], reverse=True)
    return jsonify(sorted_data)

if __name__ == '__main__':
    # Roda a API na porta 5000, acessível por qualquer IP na sua rede
    app.run(host='0.0.0.0', port=5000, debug=True)