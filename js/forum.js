const backendBaseUrl = "https://fasti-test-production.up.railway.app";

window.onload = getDiscussions();

function getDiscussions() {
  fetch(`${backendBaseUrl}/discussions`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des discussions");
      }

      return res.json();
    })
    .then((data) => {
      const sortedResponse = data.sort((a, b) => b.creation - a.creation);

      const discussions = document.querySelector(".discussion-list");

      discussions.innerHTML = sortedResponse.map((discussion) => {
        const row = (
          <li>
            <a href="/faby_front/forum/detail_discu.html?id=${discussion.id}">
              ${discussion.titre}
            </a>
            <p>
              Posté par ${discussion.user.prenom} ${discussion.user.nom}
            </p>
          </li>
        );

        return row;
      });
    })
    .catch((error) => alert(error));
}
