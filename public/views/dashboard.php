<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Fleet Manager Dashboard</title>
    <link rel="stylesheet" href="/public/styles/Dashboard.css"/>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
</head>
<body>

<div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="logo">
            <img src="https://img.icons8.com/ios-filled/40/1A73E8/bus.png" alt="Bus Icon" />
            <h2>Fleet Manager</h2>
        </div>
        <nav>
            <ul>
                <li class="active">Dashboard</li>
                <li>Routes</li>
                <li>Schedule</li>
                <li>Drivers</li>
                <li>Tickets</li>
                <li>Reports</li>
            </ul>
        </nav>
    </aside>

    <!-- Main content -->
    <main class="main-content">
        <header class="topbar">
            <span>Welcome, John Cooper</span>
        </header>

        <section class="stats">
            <div class="card"><h4>Active Buses</h4><p id="stat-buses"></p></div>
            <div class="card"><h4>Today's Routes</h4><p id="stat-routes"></p></div>
            <div class="card"><h4>Passengers</h4><p id="stat-passengers"></p></div>
            <div class="card"><h4>Revenue</h4><p id="stat-revenue"></p></div>
        </section>


        <section class="routes-section">
            <h3>Active Routes</h3>
            <table>
                <thead>
                <tr>
                    <th>Route</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Passengers</th>
                </tr>
                </thead>
                <tbody id="route-table-body"></tbody>
            </table>
        </section>
    </main>
</div>
<script src="/public/scripts/dashboard.js"></script>
</body>
</html>
