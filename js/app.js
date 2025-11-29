// js/app.js

async function loadPatients() {
  const tableBody = document.getElementById('patientTableBody');
  tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Carregando...</td></tr>';

  // Chama API Real
  const patients = await request('/patients');

  tableBody.innerHTML = ''; 

  if (!patients || patients.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum paciente encontrado.</td></tr>';
      return;
  }

  patients.forEach(p => {
    const row = `
            <tr>
                <td>${p.name}</td>
                <td>${p.cpf}</td>
                <td>
                    <span class="badge ${getBadgeColor(p.triage_status)}">${p.triage_status}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editPatient(${p.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePatient(${p.id})">Excluir</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

function getBadgeColor(status) {
  if (status === 'Vermelho') return 'bg-danger';
  if (status === 'Amarelo') return 'bg-warning text-dark';
  return 'bg-success';
}

async function deletePatient(id) {
  if (confirm('Tem certeza que deseja excluir?')) {
    await request(`/patients/${id}`, 'DELETE');
    loadPatients(); 
  }
}

function editPatient(id) {
  window.location.href = `form.html?id=${id}`;
}