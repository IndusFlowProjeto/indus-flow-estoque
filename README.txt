Testes e instruções

1) Configuração já usada (Realtime Database):
   databaseURL: https://indus-flow-projeto-default-rtdb.firebaseio.com

2) Atualizar os contadores (leituras) via curl (Windows CMD) - exemplos:
   Atualizar apenas o valor 'amarelo' para 15:
   curl -X PATCH -H "Content-Type: application/json" -d "{"amarelo":15}" "https://indus-flow-projeto-default-rtdb.firebaseio.com/leituras.json"

   Atualizar os três de uma vez:
   curl -X PATCH -H "Content-Type: application/json" -d "{"amarelo":20, "verde":18, "vermelho":12}" "https://indus-flow-projeto-default-rtdb.firebaseio.com/leituras.json"

3) Adicionar um registro histórico (POST) - exemplos:
   Oxicorte (Windows CMD):
   curl -X POST -H "Content-Type: application/json" -d "{\"tipo\":\"Oxicorte\",\"cor\":\"Vermelho\",\"data\":\"2025-10-23\",\"hora\":\"14:00:00\",\"ts\":169... ,\"quantidade\":5}" "https://indus-flow-projeto-default-rtdb.firebaseio.com/registros/oxicorte.json"

   Exemplo PowerShell (uso de single quotes facilita):
   Invoke-RestMethod -Method Post -Uri 'https://indus-flow-projeto-default-rtdb.firebaseio.com/registros/laser.json' -Body (@{tipo='Laser CNC'; cor='Amarelo'; data='2025-10-23'; hora='14:05:00'; ts= (Get-Date -UFormat %s) * 1000; quantidade=3 } | ConvertTo-Json) -ContentType 'application/json'

4) Como testar localmente:
   - Extraia o ZIP e abra index.html no Edge (recomendo hospedar via Firebase Hosting ou GitHub Pages para evitar problemas de módulo/ESM ao abrir por file://).
   - Faça login: IndusFlow / SENAI2025
   - Abra o dashboard e use os comandos curl/Powershell acima para alterar leituras e ver atualização em tempo real.

5) Observações:
   - O site agora lê diretamente do nó /leituras para mostrar os totais em tempo real (mapeamento: amarelo -> Laser CNC, vermelho -> Oxicorte, verde -> Plasma).
   - Ao clicar no card, o site mostra os registros históricos do nó /registros/<tipo> (se existirem).
