function login() {
  const user = document.getElementById("user").value.trim().toLowerCase();
  const pass = document.getElementById("pass").value.trim();
  if (user === "indusflow" && pass === "SENAI2025") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Login inválido";
  }
}
