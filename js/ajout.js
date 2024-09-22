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
  };

  const userPayload = {
    email: dataObject.mail_etu,
    prenom: dataObject.user_prenom,
    nom: dataObject.user_nom,
    role: "etudiant",
    mdp: dataObject.mdp_etu,
  };

  //   Creer le compte de l'etudiant
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
      // Creer l'utilisateur pour le forum
      fetch(`${backendBaseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(userPayload),
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
    })
    .catch((error) => alert(error));
}

const addSubjectForm = document.querySelector("form#add-subject");
addSubjectForm.addEventListener("submit", handleSubjectForm);

function handleSubjectForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const fileInput = document.querySelector('input[type="file"][name="img"]');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Extract the Base64 string
      const base64String = e.target.result.split(",")[1];

      // Construct the data object to send
      const data = {
        title: formData.get("subject_title"),
        module: formData.get("module"),
        niveau: formData.get("subject_level"),
        enseignant: formData.get("prof"),
        annee_pub: formData.get("annee_pub"),
        file_data: base64String,
      };

      // Send the data to the backend
      fetch(`${backendBaseUrl}/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    };

    reader.onerror = function (error) {
      console.error("Error: ", error);
      alert("Erreur lors de la lecture du fichier");
    };

    // Read the file as Data URL
    reader.readAsDataURL(file);
  } else {
    alert("Veuillez sélectionner un fichier");
  }
}
