/**
 * Helper público de eventos da loja.
 *
 * NÃO cole aqui tokens, chaves de API ou credenciais.
 * Para ativar o tracking, cole o snippet oficial gerado no hub
 * do produto (painel do projeto) no <head> de cada página HTML,
 * ou no bloco marcado abaixo — somente o código que o hub exibe
 * para merchants (já pensado para sites públicos).
 */

/* === Cole o snippet oficial do hub entre estas linhas (opcional) === */
/* === fim do snippet === */

window.track = function track(eventName) {
  if (typeof window.webscanner === "function") {
    return window.webscanner(eventName);
  }
  return false;
};
