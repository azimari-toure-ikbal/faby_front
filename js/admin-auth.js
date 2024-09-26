window.onload = adminRedirection();

function adminRedirection() {
  const adminCookie = getCookie("admin");
  const pathname = window.location.pathname;

  if (adminCookie && pathname.includes("/auth/admin.html")) {
    window.location.pathname = "/faby_front/admin/acceuil.html";
  }

  if (!adminCookie && pathname.includes("/auth/admin.html")) {
    return;
  }

  if (!adminCookie && pathname.includes("/faby_front/admin/acceuil.html")) {
    window.location.pathname = "/faby_front/auth/admin.html";
  }

  return;
}

const backendBaseUrl = "https://fasti-test-production.up.railway.app";

// Creation de cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

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

const connectionAdmin = document.querySelector("form#admin-auth");
connectionAdmin.addEventListener("submit", handleConnectionAdmin);

function handleConnectionAdmin(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  // console.log(dataObject)
  const payload = {
    email: dataObject.email_admin,
    password: dataObject.password_admin,
  };

  // recup info auth form
  //   console.log(payload);
  fetch(`${backendBaseUrl}/auth/admin`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Vérifier votre email et votre mot de passe");
      }
      return res.json();
    })
    .then((data) => {
      setCookie("admin", JSON.stringify(data), 2);
      window.location.pathname = "/faby_front/admin/acceuil.html";
    })
    .catch((error) => alert(error));
}
