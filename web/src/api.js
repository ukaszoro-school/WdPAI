export async function getStops() {
  const res = await fetch("/stops");
  if (!res.ok) throw new Error("Failed to fetch stops");
  return res.json();
}

export async function createStop(location) {
  const res = await fetch("/stops", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location }),
  });
  if (!res.ok) throw new Error("Failed to create stop");
  return res.json();
}

export async function removeStop(id) {
  const res = await fetch(`/stops/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete stop");
  return res.json();
}

export async function getRoutes() {
  const res = await fetch("/routes");
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

export async function createRoute(route_id, time, stop_id) {
  const res = await fetch("/routes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ route_id: route_id, time: time, stop_id: stop_id }),
  });
  if (!res.ok) throw new Error("Failed to create route");
  return res.json();
}

export async function removeRoute(id) {
  const res = await fetch(`/routes/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete route");
  return res.json();
}

export async function getLines() {
  const res = await fetch("/lines");
  if (!res.ok) throw new Error("Failed to fetch lines");
  return res.json();
}

export async function checkUser() {
  const token = localStorage.getItem('sessionToken');
  if (!token) {
    return { logged_in: false };
  }

  try {
    const res = await fetch('/me', {
      method: 'GET',
      headers: { 'Authorization': token }
    });

    if (!res.ok) {
      return { logged_in: false };
    }

    const data = await res.json();
    return { logged_in: data.logged_in, user: data.logged_in ? data : undefined };
  } catch (err) {
    console.error('Error checking login:', err);
    return { logged_in: false };
  }
}

export async function login(username, password) {
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}
