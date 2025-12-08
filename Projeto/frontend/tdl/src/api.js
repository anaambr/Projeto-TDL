const API_URL = "http://localhost:8000";

// ------------------- HELPER -------------------
async function handleResponse(res) {
  let data = null;

  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.detail || "Erro no servidor");
  }

  return data;
}

// ------------------- AUTH -------------------

export async function apiLogin(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // backend retorna: { message, token, user }
  const data = await handleResponse(res);
  return data;
}

export async function apiRegister(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  return handleResponse(res);
}

// ------------------- TASKS -------------------

export async function apiGetTasks(token, search = "") {
  const params = new URLSearchParams();
  if (search.trim()) params.append("search", search.trim());

  const res = await fetch(`${API_URL}/tasks?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // backend retorna: [ {task}, {task}... ]
  return handleResponse(res);
}

export async function apiCreateTask(token, data) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // backend retorna: { message, task }
  const payload = await handleResponse(res);
  return payload.task; // <------ CORREÇÃO IMPORTANTE
}

export async function apiGetTaskById(token, id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // backend retorna: {task fields...}
  return handleResponse(res);
}

export async function apiUpdateTask(token, id, data) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const payload = await handleResponse(res);
  return payload.task; // <------ CORREÇÃO IMPORTANTE
}

export async function apiDeleteTask(token, id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}
