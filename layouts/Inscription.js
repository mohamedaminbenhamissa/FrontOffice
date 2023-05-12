import React, { useState, useEffect } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Inscription({ data }) {
  const [membreId, setMembreId] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [groupes, setGroupes] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [tel, setTel] = useState("");
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");

  const handleSubmit = (event) => {
    const formData = new URLSearchParams();

    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("groupes", groupes);
    formData.append("adresse", adresse);
    formData.append("ville", ville);
    formData.append("pays", pays);
    formData.append("codePostal", codePostal);
    formData.append("tel", tel);
    formData.append("selectedFormation", selectedFormation);

    const token = localStorage.getItem("accessToken");

    axios
      .post(
        `http://localhost:3003/api/formations/${selectedFormation}/membres`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          const successMessage = document.createElement("p");
          successMessage.textContent = "Form submitted successfully!";
          setShow(false);
          alert(` Utilisateur ${prenom} ajouté avec succès!`);

          window.location.reload(true);
        } else {
          throw new Error(response.status);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        // Show an error message
      });
  };

  useEffect(() => {
    // Make a request to the third-party API to retrieve the list of formations
    axios
      .get("http://localhost:3003/api/formation/formations")
      .then((response) => {
        setFormations(response.data.data[0]);
        console.log("******formation********", response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFormationChange = (event) => {
    const selectedNomFormation = event.target.value;
    setSelectedFormation(selectedNomFormation ? formations.idFormation : "");
  };

  return (
    <>
      <div onSubmit={handleSubmit} style={{ block: "none" }}>
        <Card
          variant="outlined"
          sx={{
            p: 5,
            mb: 10,
            mt: 10,
            ml: 35,
            mr: 35,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                mb: 5,
                textAlign: "center",
              }}
            >
              Rejoignez la Famille Corpus LS
            </Typography>
          </Box>

          <CardContent >
            <form >
              <TextField
                id="default-value"
                label="prenom "
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  h: 5
                }}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Nom "
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Email "
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <TextField
                id="default-value"
                label="Groupes "
                variant="outlined"
                defaultValue="user1"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={groupes}
                onChange={(e) => setGroupes(e.target.value)}
              /> */}
              <TextField
                id="default-value"
                label="Adresse "
                variant="outlined"
                defaultValue="user1"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Ville "
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Pays "
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={pays}
                onChange={(e) => setPays(e.target.value)}
              />
              <TextField
                id="default-value"
                label="code Postal"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
              />
              <TextField
                id="default-value"
                label="tel"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <div>
                <div style={{ color: "black" }}>
                  Formations :
                  <div style={{ paddingLeft: "150px", display: "inline" }}>
                    <select id="formation" onChange={handleFormationChange}>
                      <option value="">Select Formation</option>
                      <option
                        value={formations.nomFormation}
                        key={formations._id}
                      >
                        {formations.nomFormation}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <br /> <br />
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
