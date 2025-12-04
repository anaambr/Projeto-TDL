export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

const data = await login(email, password);
localStorage.setItem("token", data.access_token);

export async function createTask(task) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(task),
  });

  return res.json();
}
