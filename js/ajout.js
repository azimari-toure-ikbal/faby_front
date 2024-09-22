const backendBaseUrl = "https://fasti-test-production.up.railway.app";

const addUserForm = document.querySelector("form#add-user-form");
addUserForm.addEventListener("submit", handleUserForm);

function handleUserForm(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  const payload = {
    num_etu: dataObject.num_etu,
    nom: dataObject.user_nom,
    prenom: dataObject.user_prenom,
    email: dataObject.mail_etu,
    mdp: dataObject.mdp_etu,
    niveau: dataObject.user_level,
    dob: dataObject.birth_etu,
    // creation: new Date(),
  };

  fetch(`${backendBaseUrl}/students`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          "Vérifier les informations saisies ou contacter le support"
        );
      }
      return res.json();
    })
    .then(() => {
      addUserForm.reset();
      alert("L'étudiant a bien été ajouté");
    })
    .catch((error) => alert(error));
}

const addSubjectForm = document.querySelector("form#add-subject");
addSubjectForm.addEventListener("submit", handleSubjectForm);

function handleSubjectForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  // Append the file from the file input
  const fileInput = document.querySelector('input[type="file"][name="file"]');
  formData.append("file", fileInput.files[0]);

  fetch(`${backendBaseUrl}/subjects`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          "Vérifier les informations saisies ou contacter le support"
        );
      }
      return res.json();
    })
    .then(() => {
      addSubjectForm.reset();
      alert("Le sujet a bien été ajouté");
    })
    .catch((error) => alert(error));
}
