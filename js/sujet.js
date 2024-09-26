const backendBaseUrl = "https://fasti-test-production.up.railway.app";

window.onload = getSubjects();

function getSubjects() {
  fetch(`${backendBaseUrl}/subjects`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des sujets");
      }
      return res.json();
    })
    .then((data) => {
      const subjectsTable = document.querySelector(
        "table#subjects-table>tbody"
      );
      data.forEach((subject) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${subject.title}</td>
            <td>${subject.module}</td>
            <td>${subject.niveau}</td>
            <td>${subject.enseignant}</td>
            <td>${subject.annee_pub}</td>
            <td>
              <a href="${backendBaseUrl}/${subject.chemin}" class="btn-outline">Télécharger</a>
            </td>
          `;
        subjectsTable.appendChild(row);
      });
    })
    .catch((error) => alert(error));
}

const subjectSeach = document.querySelector("input#search-subjects");
subjectSeach.addEventListener("input", handleSubjectSearch);

function handleSubjectSearch(event) {
  const searchTerm = event.target.value.toLowerCase();

  //   On filtre les sujets par le titre
  const subjectsTable = document.querySelector("table#subjects-table>tbody");
  const filteredSubjects = subjectsTable.querySelectorAll("tr");

  filteredSubjects.forEach((subject) => {
    const subjectTitle = subject.querySelector("td:nth-child(1)").textContent;
    if (subjectTitle.toLowerCase().includes(searchTerm)) {
      subject.style.display = "";
    } else {
      subject.style.display = "none";
    }
  });
}
