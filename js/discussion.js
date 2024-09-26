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

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const discussionId = getQueryParam("id");

if (discussionId) {
  getDiscussion(discussionId);
} else {
  console.error("No 'id' parameter found in the URL.");
}

function getDiscussion(id) {
  fetch(`https://fasti-test-production.up.railway.app/discussions/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération de la discussion");
      }
      return res.json();
    })
    .then((data) => {
      const sortedResponses = data.sort((a, b) => b.creation - a.creation);

      const content = document.querySelector(".discussion-content");
      content.innerHTML = `
        <h2>${sortedResponses.titre}</h2>
        <p class="discussion-author">Posté par ${
          sortedResponses.auteur.prenom
        } ${sortedResponses.auteur.nom} - ${new Date(
        sortedResponses.creation
      ).toLocaleString()}</p>
        <div class="discussion-message">
          <p>${sortedResponses.contenu}</p>
        </div>
      `;

      const messages = document.querySelector(".reponses-section");
      sortedResponses.messages.forEach((message) => {
        const response = document.createElement("div");
        response.classList.add("reponse");
        response.innerHTML = `
          <p class="reponse-author">${message.user.prenom} ${
          message.user.nom
        } - ${new Date(message.creation).toLocaleString()}</p>
          <div class="reponse-message">
            <p>${message.contenu}</p>
          </div>
        `;
        messages.appendChild(response);
      });
    })
    .catch((error) => alert(error));
}

const messageForm = document.querySelector("form#message-form");
messageForm.addEventListener("submit", handleMessageForm);

function handleMessageForm(event) {
  event.preventDefault();
  const auth = getCookie("user");

  if (!auth) {
    alert("Vous devez être connecté pour envoyer un message");
    return;
  }

  const user = JSON.parse(auth);

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  const payload = {
    contenu: dataObject.message,
    id_discussion: discussionId,
    id_utilisateur: user.id,
  };

  fetch(`${backendBaseUrl}/messages`, {
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
      {
        const messages = document.querySelector(".reponses-section");
        const response = document.createElement("div");
        response.classList.add("reponse");
        response.innerHTML = `
          <p class="reponse-author">${user.prenom} ${user.nom} - ${new Date(
          data.creation
        ).toLocaleString()}</p>
          <div class="reponse-message">
            <p>${dataObject.message}</p>
          </div>
        `;
        messages.appendChild(response);

        messageForm.reset();
      }
    })
    .catch((error) => alert(error));
}
