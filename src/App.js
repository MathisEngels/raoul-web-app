import { useState } from 'react';
import { Grid, Container, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Slider from 'react-slick';
import toast, { Toaster } from 'react-hot-toast';
import publicIp from 'public-ip';

import './App.css';
import axios from 'axios';


function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const handleValueChange = (e, type) => {
    if (type === "email") setEmail(e.target.value);
    else if (type === "message") setMessage(e.target.value)
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (message && message !== "") {
      setError(false);
      const toastId = toast.loading("Envoi...");
      const ip = await publicIp.v4();
      axios.post("http://127.0.0.1:3000/message", { email, message, ip })
        .then(function (response) {
          if (response.status === 200) {
            toast.success("Message envoyé !", {
              id: toastId,
            });
          }
        }).catch(function (error) {
          if (error.response.status === 400) {
            toast.error("Erreur.", {
              id: toastId,
            });
          } else {
            toast.error("Erreur serveur, réessayer plus tard...", {
              id: toastId,
            });
          }
        });
    } else {
      setError(true);
    }
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
  };
  const images = [
    "./box-01.jpg",
    "./carton-01.jpeg",
    "./sol-01.jpeg"
  ];

  return (
    <div className="App">
      <Container className={"content"}>
        <Typography variant={"h1"} className={"title"}>Retrouvons Raoul</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Slider {...sliderSettings}>
              {images.map((val, i) => <img key={i} src={val} />)}
            </Slider>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "left", marginTop: 16 }}>
            <Typography variant={"h2"}>Chat perdu</Typography>
            <br />
            <Typography paragraph>
              Depuis {Math.floor((Date.now() - Date.parse("21 Jul 2021")) / 86400000)} jours, nous avons perdu notre chat, Raoul.<br />
              Il a l'habitude de partir côté jardin pour 1 ou 2 nuits, mais rarement plus.<br />
              Cette fois-ci, il s'est sauvé côté rue, le matin, ce qui nous inquiète énormément.<br />
              <br />
              <b>Il doit sûrement se trouver dans les rues de Valenciennes. Nous habitons rue des déportés du train de loos et 
              avons habité rue Cahaut et rue Saudeur, il pourrait se trouver dans les environs.</b><br />
              <br />
              Raoul possède un signe distinctif, <b>son oreille droite est coupée en forme de triangle</b>,
              comme on peut le voir sur certaines photos. Cependant, il ne porte pas de collier.<br />
              <br />
              Tout renseignement nous aiderait à le retrouver. Merci de votre bienveillance. Il nous manque
              déjà beaucoup...
            </Typography>
          </Grid>
        </Grid>
        <form className={"form"} noValidate>
          <Typography component="h1" variant="h3">Aidez nous !</Typography>
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 8, marginBottom: 8 }}>Si vous avez quelconque informations, envoyer nous un message !</Typography>
          <TextField
            variant="outlined"
            style={{ marginTop: 8, marginBottom: 8 }}
            fullWidth
            id="email"
            label="Adresse mail"
            name="email"
            autoComplete="email"
            onChange={(e) => handleValueChange(e, "email")}
          />
          <TextField
            id="message"
            style={{ marginTop: 8, marginBottom: 8 }}
            multiline
            fullWidth
            required
            rows={4}
            error={error}
            helperText={error && "Vous devez entrer un message."}
            onChange={(e) => handleValueChange(e, "message")}
            label="Message"
            variant="outlined"
          />
          <Button variant="outlined" style={{ marginTop: 8, marginBottom: 8 }} onClick={handleFormSubmit}>Soumettre</Button>
        </form>
      </Container>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginBottom: 8 }}>
        {'Copyright © '}
        mathisengels.fr{' '}
        {new Date().getFullYear()}.
      </Typography>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
