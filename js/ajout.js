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

  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  const payload = {
    title: dataObject.subject_title,
    module: dataObject.module,
    niveau: dataObject.subject_level,
    enseignant: dataObject.prof,
    annee_pub: dataObject.annee_pub,
    file: dataObject.img,
  };

  console.log(payload);

  fetch(`${backendBaseUrl}/subjects`, {
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
      alert("Le sujet a bien été ajouté");
    })
    .catch((error) => alert(error));
}
