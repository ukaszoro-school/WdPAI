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
