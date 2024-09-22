const logout = document.querySelector("li#logout");
logout.addEventListener("click", handleLogout);

// Suppression de cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function handleLogout(event) {
  event.preventDefault();
  deleteCookie("admin");
  window.location.pathname = "/faby_front";
}
