// --- Stats Data ---
const stats = {
    activeBuses: 23,
    todaysRoutes: 153,
    passengers: 2843,
    revenue: 8943,
};

// --- Inject Stats ---
document.getElementById("stat-buses").textContent = stats.activeBuses;
document.getElementById("stat-routes").textContent = stats.todaysRoutes;
document.getElementById("stat-passengers").textContent = stats.passengers.toLocaleString();
document.getElementById("stat-revenue").textContent = `$${stats.revenue.toLocaleString()}`;

// --- Route Data ---
const routeData = [
    {
        route: "NYC - Boston",
        driver: "Mike Johnson",
        status: "on-time",
        departure: "09:00 AM",
        arrival: "01:30 PM",
        passengers: "42/50",
    },
    {
        route: "LA - San Francisco",
        driver: "Robert Smith",
        status: "delayed",
        departure: "10:15 AM",
        arrival: "04:45 PM",
        passengers: "38/50",
    },
    {
        route: "Chicago - Detroit",
        driver: "Sarah Wilson",
        status: "on-time",
        departure: "11:30 AM",
        arrival: "03:15 PM",
        passengers: "45/50",
    },
];

// --- Inject Route Table ---
const tbody = document.getElementById("route-table-body");

routeData.forEach((route) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${route.route}</td>
    <td>${route.driver}</td>
    <td><span class="status ${route.status}">${route.status === "on-time" ? "On Time" : "Delayed"}</span></td>
    <td>${route.departure}</td>
    <td>${route.arrival}</td>
    <td>${route.passengers}</td>
  `;
    tbody.appendChild(tr);
});
