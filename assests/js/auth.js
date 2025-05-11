// — STORAGE HELPERS —
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function setData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
function deleteEvent(index) {
  const events = getEvents();
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
}

// — AUTH —
function register(username, password) {
  const users = getData("users");
  if (username.length <= 4) throw "Username must be >4 characters";
  if (password.length <= 3) throw "Password must be >3 characters";
  if (users.some((u) => u.username === username))
    throw "Username already taken";
  users.push({ username, password });
  setData("users", users);
  localStorage.setItem("currentUser", username);
}
function login(username, password) {
  const users = getData("users");
  if (!users.find((u) => u.username === username && u.password === password)) {
    throw "Invalid credentials";
  }
  localStorage.setItem("currentUser", username);
}
function logout() {
  localStorage.removeItem("currentUser");
}
// Log out link
document.getElementById("nav-logout").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
  window.location = "index.html";
});
function currentUser() {
  return localStorage.getItem("currentUser");
}
// — NAVBAR STATE —
document.addEventListener("DOMContentLoaded", () => {
  const user = currentUser();

  const loginLink = document.getElementById("nav-login");
  const signupLink = document.getElementById("nav-signup");
  const logoutLink = document.getElementById("nav-logout");
  const navUser = document.getElementById("nav-user");

  if (user) {
    // hide login/signup, show logout
    loginLink?.classList.add("d-none");
    signupLink?.classList.add("d-none");
    logoutLink?.classList.remove("d-none");

    // clear any prior content
    navUser.textContent = "";

    // build <a class="nav-link d-flex align-items-center" href="#">
    const userLink = document.createElement("a");
    userLink.classList.add("nav-link", "d-flex", "align-items-center");
    userLink.href = "#";

    const icon = document.createElement("i");
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("fs-4");
    nameSpan.textContent = user; // safe, no HTML parsing

    // assemble and show
    userLink.append(icon, nameSpan);
    navUser.appendChild(userLink);
    navUser.classList.remove("d-none");
  } else {
    // no user: show login/signup, hide user/logout
    loginLink?.classList.remove("d-none");
    signupLink?.classList.remove("d-none");
    navUser?.classList.add("d-none");
    logoutLink?.classList.add("d-none");
  }
});
