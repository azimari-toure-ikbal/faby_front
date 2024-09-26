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
      const discussions = document.querySelector(".discussion-list");

      //   {'id': 1, 'titre': 'Article 1', 'sous_titre': 'maths', 'contenu': 'okasdpkakdas;kda;skd;akdakd;akd;alkd;kas;lkdasdasdasdasdasda', 'creation': datetime.datetime(2024, 9, 26, 12, 7, 49), 'user': {'id': 2, 'email': 'nfatoubintou8@gmail.com', 'prenom': 'Fatou Bintou', 'nom': 'NDIAYE', 'role': 'etudiant'}}

      discussions.innerHTML = data.map((discussion) => {
        return `<li>
                    <a href="/faby_front/forum/detail_discu.html?id=${discussion.id}">${discussion.titre}</a>
                    <p>Posté par ${discussion.user.prenom} ${discussion.user.nom}</p>
                </li>`;
      });
    })
    .catch((error) => alert(error));
}
