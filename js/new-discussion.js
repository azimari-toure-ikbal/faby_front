const backendBaseUrl = "https://fasti-test-production.up.railway.app";

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

const newTopicForm = document.querySelector("form#new-topic-form");
newTopicForm.addEventListener("submit", handleNewTopicForm);

function handleNewTopicForm(event) {
  event.preventDefault();
  const auth = getCookie("user");

  if (!auth) {
    alert("Vous devez être connecté pour créer une discussion");
    return;
  }

  const user = JSON.parse(auth);

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  const payload = {
    contenu: dataObject.topic_content,
    id_utilisateur: user.id,
    titre: dataObject.topic_title,
    sous_titre: dataObject.topic_subtitle,
  };

  fetch(`${backendBaseUrl}/discussions`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des discussions");
      }
      return res.json();
    })
    .then((data) => {
      window.location.pathname = `/faby_front/forum/detail_discu.html?id=${data.id}`;
    })
    .catch((error) => alert(error));
}
