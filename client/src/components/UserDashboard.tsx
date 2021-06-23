import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CardActionArea from "@material-ui/core/CardActionArea";
import MuiPhoneNumber from "material-ui-phone-number";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

// import Avatar from "@material-ui/core/Avatar";
// import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link, useLocation } from "react-router-dom";
// import { store } from "../store/store";
// import { isLogged } from "../redux/actions";
import { getUserById, logout, editUser } from "../flux/actions/authActions";
import { clearErrors } from "../flux/actions/errorActions";
import { IUserDashboard, IRootState } from "../types/interfaces";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	main: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: "auto",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
	},
	large: {
		width: theme.spacing(9),
		height: theme.spacing(9),
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	fixedHeight: {
		height: 240,
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	media: {
		width: "100%",
	},

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

const UserDashboard: React.FC<IUserDashboard> = ({
	auth,
	error,
	clearErrors,
	logout,
	editUser,
	getUserById,
}) => {
	// const signUpList = useSelector((state) => state.signUpList);
	// const loggedProfile = useSelector((state) => state.loggedProfile);
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [isDisabled, setToggle] = useState(true);
	const [data, setData] = useState<any>({
		fname: "",
		lname: "",
		email: "",
		address: "",
		phone: "",
		image: "",
		password: "",
		password2: "",
	});

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

		reader.onload = function (data: any) {
			let dataURL = data.target.result;
			dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);

			setData({
				...data,
				image: dataURL,
			});
		};

		reader.readAsDataURL(file);
	};

	const searchQuery = new URLSearchParams(useLocation().search).get("_id");

	useEffect(() => {
		if (searchQuery) getUserById(searchQuery);
		setData({
			fname: auth?.user?.fname ?? "",
			lname: auth?.user?.lname ?? "",
			email: auth?.user?.email ?? "",
			address: auth?.user?.address ?? "",
			phone: auth?.user?.phone ?? "",
			image: auth?.user?.image ?? "",
			password: "",
			password2: "",
		});
	}, [getUserById, auth.user, searchQuery]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const cancelUpdate = () => {
		if (!isDisabled) {
			setData({
				fname: auth?.user?.fname ?? "",
				lname: auth?.user?.lname ?? "",
				email: auth?.user?.email ?? "",
				address: auth?.user?.address ?? "",
				phone: auth?.user?.phone ?? "",
				image: auth?.user?.image ?? "",
				password: "",
				password2: "",
			});
		}
		setToggle(!isDisabled);
	};

	const handleOnSubmit = () => {
		editUser(data);
	};
	// const signOut = () => {
	//   store.dispatch(isLogged(false));
	// };

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}>
						Dashboard
					</Typography>
					<Tooltip title="Sign out" aria-label="add">
						<Link to="/login">
							<IconButton color="inherit" onClick={logout}>
								<Badge color="secondary">
									<ExitToAppIcon style={{ color: "white" }} />
								</Badge>
							</IconButton>
						</Link>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{}</List>
				<Divider />
				<List>{}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					{/* <Grid container spacing={3}>
            <Grid item xs={12}>
              <Container
                component="main"
                className={classes.main}
                maxWidth="sm"
              >
                {data.image && (
                  <img
                    width="20%"
                    className={classes.media}
                    src={data.image}
                    alt=""
                  />
                )}
                <Typography variant="h2" component="h1" gutterBottom>
                  {data.fname + " " + data.lname}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  Email: {data.email}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  Phone: {data.phone}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  Address: {data.address}
                </Typography>
              </Container>
            </Grid>
          </Grid> */}
					<form className={classes.form} onSubmit={handleOnSubmit} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={4} className={classes.upload}>
								{!isDisabled && (
									<input
										accept="image/*"
										className={classes.imageUp}
										id="contained-button-file"
										multiple
										type="file"
										onChange={handleUploadClick}
									/>
								)}
								<CardActionArea>
									{data.image && (
										<img
											width="40%"
											className={classes.media}
											src={data.image}
											alt=""
										/>
									)}
								</CardActionArea>
							</Grid>

							<Grid item xs={12} sm={4}>
								<label htmlFor="contained-button-file">
									<Fab component="span" className={classes.button}>
										<AddPhotoAlternateIcon />
									</Fab>
								</label>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									disabled={isDisabled}
									value={data.fname}
									id="firstName"
									fullWidth
									label="First Name"
									autoFocus
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFormField("fname", e.target.value)
									}
								/>
								<span id="fname"></span>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									value={data.lname}
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									disabled={isDisabled}
									autoComplete="lname"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFormField("lname", e.target.value)
									}
								/>
								<span id="lname"></span>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									value={data.email}
									fullWidth
									id="email"
									disabled={isDisabled}
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFormField("email", e.target.value)
									}
								/>
							</Grid>

							<Grid item xs={12}>
								<MuiPhoneNumber
									name="phone"
									label="Phone Number*"
									data-cy="user-phone"
									disabled={isDisabled}
									value={data.phone}
									defaultCountry={"us"}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFormField("phone", e.target.value)
									}
									className={classes.contact}
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Address*"
									aria-label="minimum height"
									value={data.address}
									disabled={isDisabled}
									placeholder="Address"
									className={classes.contact}
									variant="outlined"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFormField("address", e.target.value)
									}
								/>
							</Grid>
							{!isDisabled && (
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										value={data.password}
										disabled={isDisabled}
										name="password"
										label="Password"
										type="text"
										id="password"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setFormField("password", e.target.value)
										}
										autoComplete="current-password"
									/>
									<span id="pass"></span>
								</Grid>
							)}

							{!isDisabled && (
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										value={data.password2}
										name="confirm password"
										label="Confirm Password"
										type="password"
										id="conformpassword"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setFormField("password2", e.target.value)
										}
									/>
								</Grid>
							)}
						</Grid>
						<Button
							type="button"
							variant="contained"
							color="secondary"
							className={classes.submit}
							onClick={() => cancelUpdate()}>
							{isDisabled ? "Edit" : "Cancel"}
						</Button>{" "}
						{!isDisabled && (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submit}>
								Update
							</Button>
						)}
						<Grid container justify="flex-end">
							<Grid item></Grid>
						</Grid>
					</form>
				</Container>
			</main>

			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<Typography variant="body1">
						My sticky footer can be found here.
					</Typography>
				</Container>
			</footer>
		</div>
	);
};

const mapStateToProps = (state: IRootState) => ({
	auth: state.auth,
	error: state.error,
});

export default connect(mapStateToProps, {
	clearErrors,
	logout,
	editUser,
	getUserById,
})(UserDashboard);
