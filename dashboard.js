import { db } from './firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const statusEl = document.getElementById("status");
statusEl.innerText = "Firebase: conectado";

// Update helper for counts (show number + "peça(s)")
function setCount(elId, value) {
  const el = document.getElementById(elId);
  el.innerText = (value !== null && value !== undefined) ? value + " peças" : "0 peças";
}

// Map leituras keys -> card element id and registros tipo
const map = {
  amarelo: { countId: 'count-laser', registrosTipo: 'laser' },   // amarelo => Laser CNC
  vermelho: { countId: 'count-oxicorte', registrosTipo: 'oxicorte' }, // vermelho => Oxicorte
  verde: { countId: 'count-plasma', registrosTipo: 'plasma' }    // verde => Plasma
};

// Listen to leituras node (where CLP writes totals)
const leiturasRef = ref(db, 'leituras');
onValue(leiturasRef, snapshot => {
  const data = snapshot.val() || {};
  // update each mapped card
  Object.keys(map).forEach(key => {
    const cfg = map[key];
    const value = data[key];
    // show numeric value or 0
    setCount(cfg.countId, (typeof value === 'number') ? value : (value ? value : 0));
  });
});

// Keep the existing behavior for historical registros (per tipo)
function atualizar(tipo, data) {
  const countEl = document.getElementById("count-" + tipo);
  // if registros path has objects, show count of children; otherwise leave as is
  if (data) {
    const n = Object.keys(data).length;
    countEl.innerText = n + " peças";
  }
}

['oxicorte','plasma','laser'].forEach(tipo => {
  const path = "registros/" + tipo;
  const refDb = ref(db, path);
  onValue(refDb, snapshot => {
    atualizar(tipo, snapshot.val());
  });
});

window.mostrarRegistros = function(tipo) {
  const lista = document.getElementById("lista-registros");
  lista.innerHTML = "";
  const refDb = ref(db, "registros/" + tipo);
  onValue(refDb, snapshot => {
    const data = snapshot.val();
    if (data) {
      Object.values(data).forEach(reg => {
        const li = document.createElement("li");
        // Support both possible fields: reg.data/reg.hora or reg.ts
        if (reg.data && reg.hora) {
          li.innerText = reg.data + " " + reg.hora + " - " + reg.tipo + " (" + (reg.quantidade !== undefined ? reg.quantidade : '') + ")";
        } else if (reg.ts) {
          const d = new Date(reg.ts);
          li.innerText = d.toLocaleString() + " - " + reg.tipo + " (" + (reg.quantidade !== undefined ? reg.quantidade : '') + ")";
        } else {
          li.innerText = JSON.stringify(reg);
        }
        lista.appendChild(li);
      });
    } else {
      lista.innerHTML = '<li>Nenhum registro</li>';
    }
  });
}
