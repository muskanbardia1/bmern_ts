import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import CardActionArea from "@material-ui/core/CardActionArea";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import Fab from "@material-ui/core/Fab";
// import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { connect } from "react-redux";
import { register } from "../flux/actions/authActions";
import { clearErrors } from "../flux/actions/errorActions";
import { IRegisterModal, IRootState, IUser } from "../types/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
	media: {
		width: "100%",
	},
	paper: {
		marginTop: theme.spacing(8),
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
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

const SignUp: React.FC<IRegisterModal> = ({
	isAuthenticated,
	error,
	register,
	clearErrors,
	userId,
}) => {
	const classes = useStyles();
	const [data, setData] = useState<IUser>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		Address: "",
		mobileNumber: "",
		// userImage: "",
	});

	const[userImage,setUserImage]=useState("")
	// const [isValidated, setIsValidated] = useState(false);

	const setFormField = (key: string, value: any) => {
		setData({
			...data,
			[key]: value,
		});
	};
	const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = function (dataa: any) {
			let dataURL = dataa.target.result;
			dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
			setUserImage(dataURL);

			// setData({
			// 	...data,
			// 	userImage: dataURL,
			// });
		};

		reader.readAsDataURL(file);
	};

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('====================================');
		console.log(data);
		console.log('====================================');

		// Create user object

		// Attempt to login
		const formadata={...data,userImage}
		register(formadata);
	};

	if (isAuthenticated && userId) {
		return <Redirect to={`/userDashboard?_id=${userId}`} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<form className={classes.form} onSubmit={handleOnSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="fname"
								variant="outlined"
								required
								id="name"
								fullWidth
								label="First Name"
								value={data.firstName}
								autoFocus
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("firstName", e.target.value)
								}
							/>
							<span id="fname"></span>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								value={data.lastName}
								name="lastName"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("lastName", e.target.value)
								}
							/>
							<span id="lastName"></span>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type="email"
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								value={data.email}
								name="email"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("email", e.target.value)
								}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								name="phone"
								type="tel"
								label="Phone Number*"
								value={data.mobileNumber}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("mobileNumber", e.target.value)
								}
								className={classes.contact}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Address*"
								aria-label="minimum height"
								placeholder="Address"
								className={classes.contact}
								value={data.Address}
								variant="outlined"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("Address", e.target.value)
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								value={data.password}
								name="password"
								label="Password"
								type="password"
								id="password"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("password", e.target.value)
								}
							/>
							<span id="pass"></span>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								value={data.confirmPassword}
								name="confirm password"
								label="Confirm Password"
								type="password"
								id="conformpassword"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormField("confirmPassword", e.target.value)
								}
							/>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.upload}>
							<input
								accept="image/*"
								// className={classes.imageUp}
								id="contained-button-file"
								multiple={false}
								type="file"
								onChange={handleUploadClick}
							/>
							<CardActionArea>
								{userImage && (
									<img
										width="100%"
										className={classes.media}
										src={userImage}
										alt=""
									/>
								)}
							</CardActionArea>
						</Grid>
						{/* <Grid item xs={12} display="flex" sm={4}>
              <Typography component="h3" variant="h6">
                Upload profile
              </Typography>
            </Grid> */}

						{/* <Grid item xs={12} display="flex" sm={4}>
              <label htmlFor="contained-button-file">
                <Fab component="span" className={classes.button}>
                  <AddPhotoAlternateIcon />
                </Fab>
              </label>
            </Grid> */}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<span style={{ color: "blue", cursor: "pointer" }}>
								Already have an account? <Link to="/">Sign In</Link>
							</span>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

const mapStateToProps = (state: IRootState) => ({
	isAuthenticated: state.auth.isAuthenticated,
	userId: state.auth.user?._id,
	error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(SignUp);
