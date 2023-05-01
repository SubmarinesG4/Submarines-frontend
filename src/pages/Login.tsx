import { useAuthStore } from "@/stores";
import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserPool from "@/UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

interface FormValues {
	email: string;
	password: string;
}

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormValues>({ mode: "all" });

	const setAuth = useAuthStore((state) => state.setAuth);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
 
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	function formSubmitHandler(data: FormValues) {
		console.log(email);
		console.log(password);
		setAuth(email);
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
										onChange={(event) => setEmail(event.target.value)}
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
										onChange={(event) => setPassword(event.target.value)}
									/>
									{errors.password && <label className="error-text">{errors.password.message}</label>}
								</FormControl>
							</Box>
							<Box>
								<Button
									className="formButton"
									disabled={!isValid}
									variant="outlined"
									color="primary"
									onClick={handleSubmit(formSubmitHandler)}
								>
									Accedi
								</Button>
							</Box>
						</Box>
					</form>
				</CardContent>
			</Card>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => {
					setOpen(false);
				}}
			>
				<Alert
					onClose={() => {
						setOpen(false);
					}}
					severity="error"
					sx={{ width: "100%" }}
				>
					{message}
				</Alert>
			</Snackbar>
		</Box>
	);
}
