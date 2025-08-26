import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme2) => ({
  panelContainer: css`
    font-family: ${theme.typography.fontFamily};
    padding: ${theme.spacing(1)};
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  `,
  errorMessage: css`
    color: ${theme.colors.error.text};
    padding: ${theme.spacing(2)};
  `,
  healthItemWrapper: css`
    border-bottom: 1px solid ${theme.colors.border.weak};
  `,
  summaryRow: css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing(1.5, 1)};
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    &:hover {
      background-color: ${theme.colors.background.secondary};
    }
  `,
  statusIndicatorWrapper: css`
    flex: 0 0 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  statusIndicator: css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
  `,
  // Cores dos status
  status0: css` background-color: ${theme.colors.success.main}; `,
  status1: css` background-color: ${theme.colors.warning.main}; `,
  status2: css` background-color: #ff780a; `, // Laranja customizado
  status3: css` background-color: ${theme.colors.error.main}; `,

  customerName: css`
    flex: 1 1 20%; 
    font-weight: ${theme.typography.fontWeightMedium};
    padding: 0 ${theme.spacing(1)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  deviceId: css`
    flex: 1 1 30%; 
    color: ${theme.colors.text.secondary};
    padding: 0 ${theme.spacing(1)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  lastCheck: css`
    flex: 1 1 30%; 
    text-align: right;
    font-size: ${theme.typography.size.sm};
    color: ${theme.colors.text.disabled};
    white-space: nowrap;
  `,
  detailsCard: css`
    background-color: ${theme.colors.background.secondary};
    padding: ${theme.spacing(2)};
    border-top: 1px solid ${theme.colors.border.weak};
    p {
      margin: 0 0 ${theme.spacing(1)} 0;
    }
  `,
  detailsButton: css`
    display: inline-block;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrastText};
    padding: ${theme.spacing(1, 1.5)};
    border-radius: ${theme.shape.borderRadius()};
    text-decoration: none;
    margin-top: ${theme.spacing(1)};
    font-size: ${theme.typography.size.sm};
    font-weight: ${theme.typography.fontWeightMedium};
    &:hover {
      background-color: ${theme.colors.primary.shade};
    }
  `,
  headerRow: css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing(1, 1)};
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.colors.text.secondary};
    border-bottom: 2px solid ${theme.colors.border.strong};
    margin-bottom: ${theme.spacing(1)};
  `,
  customerId: css`
    flex: 1 1 20%; 
    padding: 0 ${theme.spacing(1)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
});