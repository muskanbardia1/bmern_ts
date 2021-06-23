import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import CardActionArea from "@material-ui/core/CardActionArea";
import MuiPhoneNumber from "material-ui-phone-number";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { store } from "../store/store";
import { insertUser,updateData } from "../redux/actions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  contact: {
    width: "100%",
  },
  imageUp: {
    display: "none",
  },
  button: {
    margin: 10,
  },
  upload: {
    flexDirection: "row",
  },
}));

export default function ViewAdmin({switcher, setswitcher, selectedUser}) {
  const classes = useStyles();
  const [person, setperson] = useState()
  const [selectedFile, setselectedFile] = useState(selectedUser.profilePic);
  const [phone, setphone] = useState(selectedUser.phone);
  const [fName, setfName] = useState(selectedUser.firstName);
  const [lName, setlName] = useState(selectedUser.lastName);
  const [pass, setpass] = useState(selectedUser.pass);
  const [email, setemail] = useState(selectedUser.email);
  const [address, setaddress] = useState(selectedUser.address);
  const [isValidated, setIsValidated] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const users = useSelector(state => state.users)

 

  let history = useHistory();

  const handlePhoneChange = (value) => {
    console.log(person);
    setphone(value);

  };

  const handleUploadClick = (event) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setselectedFile([reader.result]);
    }.bind(this);
    console.log(url); // Would see a path?

    setselectedFile(event.target.files[0]);
  };

  const handleFname = (e) => {
    setfName(e.target.value);
    console.log(fName);
  };

  const handleLname = (e) => {
    setlName(e.target.value);
  };
  const handleemail = (e) => {
    setemail(e.target.value);
  };

  const handlePass = (e) => {
    setpass(e.target.value);
  };

  

  const handleAddress = (e) => {
    setaddress(e.target.value);
  };

  const update = (e) => {
    e.preventDefault();

    var pwd =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (fName.length < 1) {
      setIsValidated(false);
      document.getElementById("fname").innerHTML = "Field is required!";
    } else if (fName.length < 3) {
      setIsValidated(false);

      document.getElementById("fname").innerHTML = "lenght more than 3!";
    } else if (lName.length < 1) {
      setIsValidated(false);

      document.getElementById("lname").innerHTML = "Field is required!";
    } else if (lName.length < 3) {
      setIsValidated(false);

      document.getElementById("lname").innerHTML = "lenght more than 3!";
    } else if (pass.length < 6 || !pass.match(pwd)) {
      setIsValidated(false);

      document.getElementById("pass").innerHTML =
        "length more than 6 & one character, Uppercase , lowercase required";
    } else {
      setIsValidated(true);
    }
  };

  useEffect(() => {
    if (isValidated) {
      users.map((user,index)=>
        user.id == selectedUser.id ? store.dispatch(updateData({
          firstName: fName,
          lastName: lName,
          email: email,
          profilePic:selectedFile,
          pass: pass,
          address: address,
          phone: phone,
        }, selectedUser.id)) :""
      )
      
      setswitcher(false);
      setUserAdded(true);
    }
    setIsValidated(false);
  }, [isValidated]);

  const cancelUpdate = () => {
    setswitcher(false);
    console.log(switcher);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {users.map((user,indes)=>
        user.id == selectedUser.id? <form className={classes.form} onSubmit={(e) => update(e)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <img
                width="40%"
                className={classes.media}
                src={user.profilePic}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              value={fName}
              id="firstName"
              fullWidth
              label="First Name"
              autoFocus
              onChange={(e) => handleFname(e)}
            />
            <span id="fname"></span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              value={lName}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={(e) => handleLname(e)}
            />
            <span id="lname"></span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              value={email}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => handleemail(e)}
            />
          </Grid>

          <Grid item xs={12}>
            <MuiPhoneNumber
              name="phone"
              label="Phone Number*"
              data-cy="user-phone"
              value={phone}
              defaultCountry={"us"}
              
              onChange={(e) => handlePhoneChange(e)}
              className={classes.contact}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address*"
              aria-label="minimum height"
              rowsMin={3}
              value={address}
              placeholder="Address"
              className={classes.contact}
              variant="outlined"
              onChange={(e) => handleAddress(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={pass}
              name="password"
              label="Password"
              type="text"
              id="password"
              onChange={(e) => handlePass(e)}
              autoComplete="current-password"
            />
            <span id="pass"></span>
          </Grid>

          
        </Grid>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => cancelUpdate()}
        >
          Cancel
        </Button>{" "}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          
        >
          Update
        </Button>
        <Grid container justify="flex-end">
          <Grid item></Grid>
        </Grid>
      </form> : ""
        )
        
      }
      </div>
    </Container>
  );
}
