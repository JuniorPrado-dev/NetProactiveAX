import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder.addSelect({
    path: 'panelMode',
    name: 'Tipo de Análise',
    description: 'Selecione o modo de visualização do painel.',
    defaultValue: 'health',
    settings: {
      options: [
        { value: 'health', label: 'Análise de Saúde' },
        { value: 'churn', label: 'Análise de Risco de Evasão' },
      ],
    },
  });
});