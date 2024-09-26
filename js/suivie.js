window.onload = getStudents();
window.onload = getSubjects();

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
            <button class="btn-outline" onclick="deleteStudent('${student.num_etu}', this)">Supprimer</button>
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

function deleteStudent(id, btn) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
    fetch(`${backendBaseUrl}/students/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la suppression de l'étudiant");
        }

        const row = btn.closest("tr");
        row.remove();
        alert("L'étudiant a bien été supprimé");
      })
      .catch((error) => alert(error));
  }
}

const studentSeach = document.querySelector("input#search-students");
studentSeach.addEventListener("input", handleStudentSearch);

function handleStudentSearch(event) {
  const searchTerm = event.target.value.toLowerCase();

  //   On filtre les étudiants par le prénom
  const studentsTable = document.querySelector("table#students-table>tbody");
  const filteredStudents = studentsTable.querySelectorAll("tr");

  filteredStudents.forEach((student) => {
    const studentName = student.querySelector("td:nth-child(1)").textContent;
    if (studentName.toLowerCase().includes(searchTerm)) {
      student.style.display = "";
    } else {
      student.style.display = "none";
    }
  });
}
