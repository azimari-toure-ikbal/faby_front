const backendBaseUrl = "https://fasti-test-production.up.railway.app";

function getStudents() {
  fetch(`${backendBaseUrl}/students`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des étudiants");
      }
      return res.json();
    })
    .then((data) => {
      const studentsTable = document.querySelector(
        "table#students-table>tbody"
      );
      data.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.nom}</td>
          <td>${student.prenom}</td>
          <td>${student.num_etu}</td>
          <td>${student.dob}</td>
          <td>${student.email}</td>
          <td>${student.niveau}</td>
          <td>
            <button id="supp" class="btn-outline">Supprimer</button>
          </td>
        `;
        studentsTable.appendChild(row);
      });
    })
    .catch((error) => alert(error));
}

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
            <button id="supp" class="btn-outline">Supprimer</button>
          </td>
        `;
        subjectsTable.appendChild(row);
      });
    })
    .catch((error) => alert(error));
}
