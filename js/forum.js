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
        return `<li>
                    hello
                </li>`;
      });
    })
    .catch((error) => alert(error));
}
