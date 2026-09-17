const copyButton = document.getElementById('copy-install');
const copyStatus = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  const text = document.getElementById('install-code').textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copiado!';
    copyStatus.textContent = 'Comandos copiados. Cole no seu terminal.';
    setTimeout(() => { copyButton.textContent = 'Copiar comandos'; }, 2500);
  } catch {
    copyStatus.textContent = 'Selecione os comandos acima e copie manualmente.';
  }
});
