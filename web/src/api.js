export async function getStops() {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/stops", { headers: { "Authorization": token } });
  if (!res.ok) throw new Error("Failed to fetch stops");
  return res.json();
}

export async function createStop(location) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/stops", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ location }),
  });
  if (!res.ok) throw new Error("Failed to create stop");
  return res.json();
}

export async function removeStop(id) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch(`/stops/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  if (!res.ok) throw new Error("Failed to delete stop");
  return res.json();
}

export async function getRoutes() {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/routes", { headers: { "Authorization": token } });
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

export async function createRoute(route_id, time, stop_id) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ route_id: route_id, time: time, stop_id: stop_id }),
  });
  if (!res.ok) throw new Error("Failed to create route");
  return res.json();
}

export async function removeRoute(id) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch(`/routes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  if (!res.ok) throw new Error("Failed to delete route");
  return res.json();
}

export async function getLines() {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/lines", { headers: { "Authorization": token } });
  if (!res.ok) throw new Error("Failed to fetch lines");
  return res.json();
}

export async function checkUser() {
  const token = localStorage.getItem("sessionToken");
  if (!token) {
    return { logged_in: false };
  }

  try {
    const res = await fetch("/me", {
      method: "GET",
      headers: { "Authorization": token }
    });

    if (!res.ok) {
      return { logged_in: false };
    }

    const data = await res.json();
    return { logged_in: data.logged_in, user: data.logged_in ? data : undefined };
  } catch (err) {
    console.error("Error checking login:", err);
    return { logged_in: false };
  }
}

export async function login(username, password) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function createUser(username, password) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (!res.ok) throw new Error("Failed to register new user");
  return res.json();
}

export async function getUsers() {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch("/users", { headers: { "Authorization": token } });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function removeUser(id) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch(`/users/${id}`, {
    method: "DELETE",
    headers: { "Authorization": token },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

export async function assignRole(userId, role) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch(`/users/${userId}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error("Failed to assign role");
  return res.json();
}

export async function removeRole(userId, role) {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch(`/users/${userId}/roles`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error("Failed to remove role");
  return res.json();
}

export async function getUserDuties(userId) {
  const token = localStorage.getItem("sessionToken");
  const users = await getUsers();
  const user = users.find(u => u.id === userId);
  return user?.duties ?? [];
}

export async function assignDuty(userId, routeId, method = "POST") {
  const token = localStorage.getItem("sessionToken");
  const res = await fetch(`/users/${userId}/duties`, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ route_id: routeId }),
  });
  if (!res.ok) throw new Error(`Failed to ${method === "DELETE" ? "remove" : "assign"} duty`);
}
