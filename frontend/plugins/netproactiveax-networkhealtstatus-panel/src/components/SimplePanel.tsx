import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions, HealthStatusItem, ChurnRiskItem } from '../types';
import { useStyles2 } from '@grafana/ui';
import { getStyles } from './SimplePanelstyles';

interface Props extends PanelProps<SimpleOptions> {}

// Componente para o Painel de Saúde
const HealthPanel: React.FC<{ styles: any; data: any }> = ({ styles, data }) => {
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
    <>
      <div className={styles.headerRow}>
        <div className={styles.statusIndicatorWrapper}>Status</div>
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
              <div className={styles.statusIndicatorWrapper}><span className={`${styles.statusIndicator} ${statusStyle}`}></span></div>
              <div className={styles.customerId}>{item.customerId}</div>
              <div className={styles.customerName}>{item.customerName}</div>
              <div className={styles.deviceId}>{item.deviceId}</div>
              <div className={styles.lastCheck}>{new Date(item.lastCheck).toLocaleString()}</div>
            </div>
            {isExpanded && (
                <div className={styles.detailsCard}>
                <p><strong>Summary:</strong> {item.summary}</p>
                <p><strong>Recommendation:</strong> {item.recommendation}</p>
                <a href={item.detailsLink} className={styles.detailsButton} target="_blank" rel="noopener noreferrer">Detailed Analysis</a>
                </div>
            )}
          </div>
        );
      })}
    </>
  );
};

// Componente para o Painel de Churn
const ChurnPanel: React.FC<{ styles: any; data: any }> = ({ styles, data }) => {
  const frame = data.series[0];
  const rows: ChurnRiskItem[] = [];
  for (let i = 0; i < frame.length; i++) {
    const row: any = {};
    for (const field of frame.fields) {
      // O Infinity pode retornar o array como uma string JSON, então precisamos parseá-lo
      if (field.name === 'keyFactors' && typeof field.values[i] === 'string') {
        try {
          row[field.name] = JSON.parse(field.values[i]);
        } catch (e) {
          row[field.name] = [];
        }
      } else {
        row[field.name] = field.values[i];
      }
    }
    rows.push(row as ChurnRiskItem);
  }

  const getRiskStyle = (level: 'Alto' | 'Médio' | 'Baixo') => {
    if (level === 'Alto') return styles.riskHigh;
    if (level === 'Médio') return styles.riskMedium;
    return styles.riskLow;
  };

  return (
    <>
      <div className={styles.headerRow}>
        <div className={styles.customerId}>Customer ID</div>
        <div className={styles.customerName}>Customer Name</div>
        <div className={styles.progressBarContainer}>Churn Risk Score</div>
        <div className={styles.keyFactorsContainer}>Key Factors</div>
      </div>
      {rows.map((item, index) => (
        <div key={item.customerId || index} className={styles.healthItemWrapper}>
          <div className={styles.summaryRow}>
            <div className={styles.customerId}>{item.customerId}</div>
            <div className={styles.customerName}>{item.customerName}</div>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${getRiskStyle(item.riskLevel)}`} style={{ width: `${item.churnRiskScore}%` }}>
                {item.churnRiskScore}%
              </div>
            </div>
            <div className={styles.keyFactorsContainer}>
              {item.keyFactors?.map((factor, i) => <span key={i} className={styles.keyFactorTag}>{factor}</span>)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


// Componente Principal que decide qual painel renderizar
export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);

  if (!data || !data.series.length || !data.series[0].fields.length) {
    return <div>No data to display. Configure the query in the Query tab.</div>;
  }

  return (
    <div className={styles.panelContainer}>
      {options.panelMode === 'health' ? (
        <HealthPanel styles={styles} data={data} />
      ) : (
        <ChurnPanel styles={styles} data={data} />
      )}
    </div>
  );
};