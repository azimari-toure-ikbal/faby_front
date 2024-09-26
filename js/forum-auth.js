const backendBaseUrl = "https://fasti-test-production.up.railway.app";

// Creation de cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

const connectionForum = document.querySelector("form#user-auth");
connectionForum.addEventListener("submit", handleConnectionForum);

function handleConnectionForum(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  // console.log(dataObject)
  const payload = {
    email: dataObject.email,
    password: dataObject.password,
  };

  fetch(`${backendBaseUrl}/auth/user`, {
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
      setCookie("user", JSON.stringify(data), 2);
      window.location.pathname = "/faby_front/forum/acceuil.html";
    })
    .catch((error) => alert(error));
}
