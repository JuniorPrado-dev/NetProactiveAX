// Define a estrutura de um único item retornado pela API de saúde
export interface HealthStatusItem {
  customerId: string;
  customerName: string;
  deviceId: string;
  status: string;
  statusCode: number;
  summary: string;
  recommendation: string;
  lastCheck: string;
  detailsLink: string;
}

// Define as opções de configuração do painel
export interface SimpleOptions {}