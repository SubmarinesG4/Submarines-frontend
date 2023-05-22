import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { Auth } from "aws-amplify";
import { useAuth } from "@/stores/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
		formState: { errors, isValid }
	} = useForm<FormValues>({ mode: "all" });

	const [stage, setStage] = useState(1); // 1 = login stage, 2 = first access stage, 3 = complete new password stage
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const auth = useAuth();
	let user: any, userGroup: any;

	async function formSubmitHandler(data: FormValues) {
		try {
			user = await Auth.signIn(data.email.trim(), password);
			if(user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				setStage(2);
				if(stage === 3){
					Auth.completeNewPassword(user, newPassword).then(user => {console.log(user);})
					.catch(e => {
						console.log(e);
					});
					setStage(1);
					location.reload();
				}
			} else {
				userGroup = user.signInUserSession.accessToken.payload["cognito:groups"];
				localStorage.setItem('currentUser', user.username);
				localStorage.setItem('currentUserRole', userGroup[0]);
				auth?.setAuth(true);
			}
		} catch(err: any) {
			console.error("ERROR: ", err);
			setOpen(true);
			setMessage(err.message);
		}
	}

	return (
		<Box className="formBox">
			<Card className="cardFormBox">
				<img src="public\login.png" className="imgHeading" alt="accesso"/>
				<CardContent>
				{stage===1 && (
					<form onSubmit={handleSubmit(formSubmitHandler)}>
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
											minLength: 8 
										})}
										onChange={(event) => setPassword(event?.target.value)}
									/>
									{errors.password && <label className="error-text">{errors.password.message}</label>}
								</FormControl>
							</Box>
							<Box>
								<Button
									disabled={!isValid}
									variant="outlined"
									color="primary"
									type="submit"
								>
									Accedi
								</Button>
							</Box>
							<Box className="resetPassword">
								<Link to={"/resetPassword"} className="linkResetPswd">Password dimenticata?</Link>			
							</Box>
						</Box>
					</form>
				)}

				{(stage===2 || stage===3) && (
					<form onSubmit={handleSubmit(formSubmitHandler)}>
						<Box>
							<Box className="headingForm">Cambio password</Box>
							<Box className="headingDesc"><p>Se è il tuo primo accesso è necessario cambiare la password</p></Box>
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
												value:
												/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/u,
												message:
												"La password deve essere lunga almeno 8 caratteri e contenere almeno una lettera maiuscola, una minuscola, un numero e un simbolo tra @$!%*?&.",
											},
										})}
										onChange={(event) => setNewPassword(event.target.value)}
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
											validate: (value) =>
											value === getValues("newPassword") ||
											"Password diverse", 
										})}
										onChange={(event) => setConfirmNewPassword(event.target.value)}
									/>
									{errors.confirmNewPassword && <label className="error-text">{errors.confirmNewPassword.message}</label>}
								</FormControl>
							</Box>
							<Box>
								<Button
									disabled={!isValid}
									variant="outlined"
									color="primary"
									type="submit"
									onClick={() => setStage(3)}
								>
									Cambia password
								</Button>
							</Box>
							<Box className="resetPassword">
								<Link to={"/resetPassword"} className="linkResetPswd">Password dimenticata?</Link>			
							</Box>
						</Box>
					</form>
				)}
				</CardContent>
			</Card>
			<Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
		</Box>
	);
}
