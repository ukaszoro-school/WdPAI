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
