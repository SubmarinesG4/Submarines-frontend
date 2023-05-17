import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { Auth } from "aws-amplify";
import { useAuth } from "@/stores/AuthProvider";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";

interface FormValues {
	email: string;
	password: string;
}

export default function Login() {
	const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({ mode: "all" });

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const auth = useAuth();

	async function formSubmitHandler(data: FormValues) {
		try {
			const user = await Auth.signIn(data.email.trim(), data.password);
			localStorage.setItem('currentUser', user.username);
			auth?.setAuth(true);

			// to fix Auth.currentAuthenticatedUser() bug (just for users created manually with pool)
			if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                Auth.completeNewPassword(user, data.password,).then(user => {console.log(user);})
				.catch(e => {
                  	console.log(e);
                });
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
											minLength: 8 })}
									/>
									{errors.password && <label className="error-text">{errors.password.message}</label>}
								</FormControl>
							</Box>
							<Box>
								<Button
									disabled={!isValid}
									variant="outlined"
									color="primary"
									onClick={handleSubmit(formSubmitHandler)}
								>
									Accedi
								</Button>
							</Box>
							<Box className="resetPassword">
								<Link to={"/resetPassword"} className="linkResetPswd">Password dimenticata?</Link>			
							</Box>
						</Box>
					</form>
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
