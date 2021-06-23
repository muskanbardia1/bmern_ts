import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { login } from "../flux/actions/authActions";
import { clearErrors } from "../flux/actions/errorActions";
import { ILoginModal, IRootState } from "../types/interfaces";
import { UserType } from "../types/enum";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn: React.FC<ILoginModal> = ({
	isAuthenticated,
	error,
	login,
	clearErrors,
	userType,
}) => {
	const classes = useStyles();
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	// const [msg, setMsg] = useState(null);

	const setFormField = (key: string, value: any) => {
		setData({
			...data,
			[key]: value,
		});
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		login(data);
	};

	if (isAuthenticated) {
		if (userType && userType === UserType.ADMIN) {
			return <Redirect to="/adminDashboard" />;
		}

		return <Redirect to="/dashboard" />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>

				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFormField("email", e.target.value)
						}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={({ target }: any) =>
							setFormField("password", target.value)
						}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Sign In
					</Button>{" "}
					<span id="invalid"></span>
					<Grid container>
						<Grid item>
							<span style={{ color: "blue", cursor: "pointer" }}>
								Dont have an account? <Link to="/register">Sign Up</Link>
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
	userType: state.auth.user?.userType,
	error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(SignIn);
