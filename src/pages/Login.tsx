import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { setUser } from "@/app/slices/userSlice";
import { useUserActions } from "@/hooks/userUserActions";
import { useSnackbarMessage } from "@/hooks/useSnackbarMessage";

interface FormValues {
	email: string;
	password: string;
	newPassword: string;
	confirmNewPassword: string;
}

export default function Login() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: "all" });
	const { signIn, getNewPassword } = useUserActions();

	const dispatch = useAppDispatch();
	const [stage, setStage] = useState(1); // 1 = login stage, 2 = first access stage, 3 = complete new password stage

	const setSnackbarMessage = useSnackbarMessage();

	let userRef = useRef(null);
	async function loginSubmitHandle(data: FormValues) {
		try {
			let user = await signIn(data.email.trim(), data.password);
			userRef.current = user;
			if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
				setStage(2);
			} else {
				let userGroup = user.signInUserSession.accessToken.payload["cognito:groups"];
				userGroup = Array.isArray(userGroup) ? userGroup : userGroup[0];
				dispatch(
					setUser({
						username: user.username,
						roles: userGroup,
						attributes: user.attributes,
					})
				);
				localStorage.setItem("authToken", user.signInUserSession?.idToken?.jwtToken);
			}
		} catch (err: any) {
			console.error("ERROR: ", err);
			setSnackbarMessage(err.message);
		}
	}

	async function newPasswordSubmitHandle(data: FormValues) {
		try {
			getNewPassword(userRef.current, data.newPassword);
			setStage(1);
		} catch (err: any) {
			console.error("ERROR: ", err);
			setSnackbarMessage(err.message);
		}
	}

	return (
		<Box className="formBox">
			<Card className="cardFormBox">
				<img src="/login.png" className="imgHeading" alt="accesso" />
				<CardContent>
					{stage === 1 && (
						<form onSubmit={handleSubmit(loginSubmitHandle)}>
							<Box>
								<Box className="headingForm">Accesso</Box>
								<Box className="formField">
									<FormControl fullWidth>
										<InputLabel variant="filled" sx={{ color: "#666666" }}>
											email
										</InputLabel>
										<FilledInput
											id="email"
											fullWidth
											type="email"
											error={!!errors.email}
											{...register("email", {
												required: "Campo obbligatorio",
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: "Formato errato della email",
												},
											})}
										/>
										{errors.email && <label className="error-text">{errors.email.message}</label>}
									</FormControl>
								</Box>
								<Box className="formField">
									<FormControl fullWidth variant="outlined">
										<InputLabel variant="filled">password</InputLabel>
										<FilledInput
											id="password"
											fullWidth
											type="password"
											error={!!errors.password}
											{...register("password", {
												required: "Campo obbligatorio",
												minLength: 8,
											})}
										/>
										{errors.password && <label className="error-text">{errors.password.message}</label>}
									</FormControl>
								</Box>
								<Box>
									<Button disabled={!isValid} variant="outlined" color="primary" type="submit">
										Accedi
									</Button>
								</Box>
								<Box className="resetPassword">
									<Link to={"/resetPassword"} className="linkResetPswd">
										Password dimenticata?
									</Link>
								</Box>
							</Box>
						</form>
					)}
					{stage === 2 && (
						<form onSubmit={handleSubmit(newPasswordSubmitHandle)}>
							<Box>
								<Box className="headingForm">Cambio password</Box>
								<Box className="headingDesc">
									<p>Se è il tuo primo accesso è necessario cambiare la password</p>
								</Box>
								<Box className="formField">
									<FormControl fullWidth variant="outlined">
										<InputLabel variant="filled">nuova password</InputLabel>
										<FilledInput
											id="newPassword"
											fullWidth
											type="password"
											error={!!errors.password}
											{...register("newPassword", {
												required: "Campo richiesto",
												pattern: {
													value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/u,
													message:
														"La password deve essere lunga almeno 8 caratteri e contenere almeno una lettera maiuscola, una minuscola, un numero e un simbolo tra @$!%*?&.",
												},
											})}
										/>
										{errors.newPassword && <label className="error-text">{errors.newPassword.message}</label>}
									</FormControl>
								</Box>
								<Box className="formField">
									<FormControl fullWidth variant="outlined">
										<InputLabel variant="filled">conferma password</InputLabel>
										<FilledInput
											id="confirmNewPassword"
											fullWidth
											type="password"
											error={!!errors.confirmNewPassword}
											{...register("confirmNewPassword", {
												required: "Conferma password necessaria",
												validate: (value) => value === getValues("newPassword") || "Password diverse",
											})}
										/>
										{errors.confirmNewPassword && (
											<label className="error-text">{errors.confirmNewPassword.message}</label>
										)}
									</FormControl>
								</Box>
								<Box>
									<Button disabled={!isValid} variant="outlined" color="primary" type="submit">
										Cambia password
									</Button>
								</Box>
								<Box className="resetPassword">
									<Link to={"/resetPassword"} className="linkResetPswd">
										Password dimenticata?
									</Link>
								</Box>
							</Box>
						</form>
					)}
				</CardContent>
			</Card>
		</Box>
	);
}
