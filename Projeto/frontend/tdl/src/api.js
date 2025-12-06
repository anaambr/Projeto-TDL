const API_URL = "http://localhost:8000";

async function request(path, options = {}) {
  const { method = "GET", body, token } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch (err) {
    data = {};
  }

  if (!res.ok) {
    throw new Error(
      data.detail || data.message || "Erro ao comunicar com o servidor"
    );
  }

  return data;
}

export function apiRegister(name, email, password) {
  return request("/register", {
    method: "POST",
    body: { name, email, password },
  });
}

export function apiLogin(email, password) {
  return request("/login", {
    method: "POST",
    body: { email, password },
  });
}

export function apiGetTasks(token) {
  return request("/tasks", {
    method: "GET",
    token,
  });
}

export function apiCreateTask(token, { title, description }) {
  return request("/tasks", {
    method: "POST",
    token,
    body: { title, description },
  });
}

export function apiUpdateTask(token, id, updates) {
  return request(`/tasks/${id}`, {
    method: "PUT",
    token,
    body: updates,
  });
}

export function apiDeleteTask(token, id) {
  return request(`/tasks/${id}`, {
    method: "DELETE",
    token,
  });
}
