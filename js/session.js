// Recuperation de cookie
function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

function adminRedirection() {
  const adminCookie = getCookie("admin");
  const pathname = window.location.pathname;

  if (adminCookie && pathname.includes("/auth/admin.html")) {
    window.location.pathname = "/faby_front/admin/acceuil.html";
  }

  if (!adminCookie && pathname.includes("/admin")) {
    window.location.pathname = "/faby_front/auth/admin.html";
  }
}
