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
      const content = document.querySelector(".discussion-content");
      content.innerHTML = `
        <h2>${data.titre}</h2>
        <p class="discussion-author">Posté par ${data.user.prenom} ${data.user.nom} - ${data.creation}</p>
        <div class="discussion-message">
          <p>${data.contenu}</p>
        </div>
      `;

      const messages = document.querySelector(".reponses-section");
      //   There's a h3 tag inside the response section div
      // secion.responses-section > h3 > div.response

      // Create me the div.response for each message
      data.messages.forEach((message) => {
        const response = document.createElement("div");
        response.classList.add("reponse");
        response.innerHTML = `
          <p class="reponse-author">${message.user.prenom} ${message.user.nom} - ${message.creation}</p>
          <div class="reponse-message">
            <p>${message.contenu}</p>
          </div>
        `;
        messages.appendChild(response);
      });
    })
    .catch((error) => alert(error));
}
