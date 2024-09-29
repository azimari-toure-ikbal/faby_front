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
      const sortedResponse = data.sort(
        (a, b) => new Date(b.creation) - new Date(a.creation)
      );

      const discussions = document.querySelector(".discussion-list");

      discussions.innerHTML = sortedResponse
        .map((discussion) => {
          return `<li>
                    <a href="/faby_front/forum/detail_discu.html?id=${discussion.id}">${discussion.titre}</a>
                    <p>Posté par ${discussion.user.prenom} ${discussion.user.nom}</p>
                </li>`;
        })
        .join("");
    })
    .catch((error) => alert(error));
}

const newDiscussion = document.querySelector("#new-discussion");
newDiscussion.addEventListener("click", handleNewDiscussion);

function handleNewDiscussion() {
  const auth = getCookie("user");

  if (!auth) {
    alert("Vous devez être connecté pour créer une discussion");
    return;
  }

  window.location.href = "/faby_front/forum/discu.html";
}
