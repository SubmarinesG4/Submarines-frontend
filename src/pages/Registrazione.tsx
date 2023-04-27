import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import "../globals/index.css";

interface FormValues {
	cognome: string;
    nome: string;
	password: string;
    confirmPassword: string;
}

export default function Registrazione() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<FormValues>({ mode: "all" });

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	function formSubmitHandler(data: FormValues) {
		/* gestione della registrazione */
	}

	return (
		<Box className="formBox">
			<Card className="cardFormBox">
			<img src="public\registrazione.png" className="imgHeading" alt="nuovo utente"/>
				<CardContent>
					<form onSubmit={handleSubmit(formSubmitHandler)}>
						<Box>
                            <Box className="headingForm">Registrazione</Box>
							<Box className="formField">
								<FormControl fullWidth>
									<InputLabel variant="filled" className="inputFieldForm">cognome</InputLabel>
									<FilledInput
										fullWidth
										type="text"
										id="cognome"
										error={!!errors.cognome}
										{...register("cognome", { required: "Campo richiesto" })}
									/>
	  								{errors.cognome && <label className="error-text">{errors.cognome.message}</label>}
								</FormControl>
							</Box>
							<Box className="formField">
								<FormControl fullWidth variant="outlined">
									<InputLabel variant="filled">nome</InputLabel>
									<FilledInput
										id="nome"
										fullWidth
										type="text"
										error={!!errors.nome}
										{...register("nome", { required: "Campo richiesto" })}
									/>
									{errors.nome && <label className="error-text">{errors.nome.message}</label>}
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
											required: "Password vuota", 
											pattern: {
												value:
												  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/u,
												message:
												  "La password deve essere lunga almeno 8 caratteri e contenere almeno una lettera maiuscola, una minuscola, un numero e un simbolo tra @$!%*?&.",
											  },
										})}
									/>
									{errors.password && <label className="error-text">{errors.password.message}</label>}
								</FormControl>
							</Box>
                            <Box className="formField">
								<FormControl fullWidth variant="outlined">
									<InputLabel variant="filled">conferma password</InputLabel>
									<FilledInput
										id="confirmPassword"
										fullWidth
										type="password"
										error={!!errors.confirmPassword}
										{...register("confirmPassword", { 
											required: "Conferma password necessaria",
											validate: (value) =>
                  							value === getValues("password") ||
                  							"Password diverse.", 
										})}
									/>
									{errors.confirmPassword && <label className="error-text">{errors.confirmPassword.message}</label>}
								</FormControl>
							</Box>
							<Box>
								<Button
									disabled={!isValid}
									variant="outlined"
									color="primary"
									onClick={handleSubmit(formSubmitHandler)}
								>
									Registrati
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
