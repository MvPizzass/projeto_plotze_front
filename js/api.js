// js/api.js

// URL DE PRODUÇÃO (Você vai descomentar esta linha depois do deploy no Render)
const API_BASE_URL = 'https://projeto-plotze-web.onrender.com/api'; 

async function request(endpoint, method = 'GET', body = null) {
  const headers = {'Content-Type': 'application/json'};

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await response.json();
  } catch (error) {
    console.error(error);
    alert('erro: '+ error);
    return null;
  }
}