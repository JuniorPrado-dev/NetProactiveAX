import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  // Esta seção fica intencionalmente vazia porque o nosso painel não tem opções configuráveis.
  // O código de exemplo que causava o erro foi removido.
  return builder;
});