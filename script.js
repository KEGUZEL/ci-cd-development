async function loadUsers() {
  try {
    const response = await fetch("/api/users");
    const users = await response.json();

    const container = document.getElementById("users");
    container.innerHTML = "";

    users.forEach(user => {
      const div = document.createElement("div");
      div.textContent = `${user.name} — ${user.role}`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("API bağlantı hatası:", err);
  }
}

window.onload = loadUsers;

