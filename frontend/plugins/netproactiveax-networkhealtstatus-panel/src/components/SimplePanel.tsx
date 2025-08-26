import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions, HealthStatusItem } from '../types';
import { useStyles2 } from '@grafana/ui';
import { getStyles } from './SimplePanelstyles';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleRowClick = (customerId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(customerId)) {
      newExpandedRows.delete(customerId);
    } else {
      newExpandedRows.add(customerId);
    }
    setExpandedRows(newExpandedRows);
  };

  // Verifica se há dados e se a estrutura é válida
  if (!data || !data.series.length) {
    return <div>No data</div>;
  }

  // Mapeia os campos da primeira série de dados para um formato mais fácil de usar
  const frame = data.series[0];
  const rows: HealthStatusItem[] = [];
  for (let i = 0; i < frame.length; i++) {
    const row: any = {};
    for (const field of frame.fields) {
      row[field.name] = field.values[i];
    }
    rows.push(row as HealthStatusItem);
  }

  return (
    <div className={styles.panelContainer}>
      {/* CABEÇALHO ADICIONADO */}
      <div className={styles.headerRow}>
        <div className={styles.statusIndicatorWrapper}>Status</div> {/* Espaçador para o status */}
        <div className={styles.customerId}>Customer ID</div>
        <div className={styles.customerName}>Customer Name</div>
        <div className={styles.deviceId}>Device ID</div>
        <div className={styles.lastCheck}>Last Check</div>
      </div>
      {rows.map((item, index) => {
        const isExpanded = expandedRows.has(item.customerId);
        const statusStyleKey = `status${item.statusCode}` as 'status0' | 'status1' | 'status2' | 'status3';
        const statusStyle = styles[statusStyleKey];

        return (
          <div key={item.customerId || index} className={styles.healthItemWrapper}>
            <div className={styles.summaryRow} onClick={() => handleRowClick(item.customerId)}>
              <div className={styles.statusIndicatorWrapper}>
                <span className={`${styles.statusIndicator} ${statusStyle}`}></span>
              </div>
              {/* ID DO CLIENTE ADICIONADO */}
              <div className={styles.customerId}>{item.customerId}</div>
              <div className={styles.customerName}>{item.customerName}</div>
              <div className={styles.deviceId}>{item.deviceId}</div>
              <div className={styles.lastCheck}>{new Date(item.lastCheck).toLocaleString()}</div>
            </div>

            {isExpanded && (
              <div className={styles.detailsCard}>
                <p><strong>Resumo:</strong> {item.summary}</p>
                <p><strong>Recomendação:</strong> {item.recommendation}</p>
                <a href={item.detailsLink} className={styles.detailsButton} target="_blank" rel="noopener noreferrer">
                  Analise Detalhada
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};