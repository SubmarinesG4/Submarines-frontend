import { useAuthStore } from "@/stores";
import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	function formSubmitHandler(data: FormValues) {
		setAuth("test");
		/* gestione dell'accesso */
	}

	return (
		<Box className="formBox">
			<Card className="cardFormBox">
				<img src="public\login.png" className="imgHeading" alt="accesso"/>
				<CardContent>
					<form onSubmit={handleSubmit(formSubmitHandler)}>
						<Box>
							<Box className="headingForm">Log in</Box>
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
										{...register("email", { required: true })}
									/>
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
										{...register("password", { required: true, minLength: 4, maxLength: 20 })}
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
