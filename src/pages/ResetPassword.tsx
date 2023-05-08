import { Alert, Box, Button, Card, CardContent, FilledInput, FormControl, InputLabel, Snackbar } from "@mui/material";
import { ISignUpResult, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import  { Navigate } from "react-router-dom";

interface FormValues {
	email: string;
    code: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function ResetPassword() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid }
	} = useForm<FormValues>({ mode: "all" });

    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage, 3 = login redirect
    const [email, setEmail] = useState("");
    
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

    const getUser = () => {
        return new CognitoUser({
            Username: email.toLowerCase(),
            Pool: new CognitoUserPool({
                UserPoolId: "eu-central-1_57mvV5N7n",
                ClientId: "snftpb6f6bsdaphl7rv34lnl"
            })
        })
    }

    const sendCode = () => {
        getUser().forgotPassword({
            onSuccess: data => {
                console.log("onSuccess:", data);
            },
            onFailure: err => {
                console.log("onFailure:", err);
            },
            inputVerificationCode: data => {
                console.log("Input code:", data);
                setStage(2);
            }
        });
    }

	function formSubmitHandler(data: FormValues) {
		// Send confirmation code to user's email
        /* Auth.forgotPassword(data.email).then((data) => console.log(data))
        .catch((err) => {
            console.error("ERROR: ", err);
			setOpen(true);
			setMessage(err.message);
        }); */

        // Collect confirmation code and new password, then
        /* Auth.forgotPasswordSubmit(username, code, new_password)
        .then((data) => console.log(data))
        .catch((err) => console.log(err)); */
	}

	return (
		<Box className="formBox">
			<Card className="cardFormBox">
				<img src="public\resetPswd.png" className="imgHeading" alt="recupero della password"/>
				<CardContent>
                    {stage===1 && (
                        <form onSubmit={handleSubmit(formSubmitHandler)}>
                            <Box>
                                <Box className="headingForm">Recupero password</Box>
                                <Box className="formField">
                                    <FormControl fullWidth>
                                        <InputLabel variant="filled" sx={{ color: "#666666" }}>
                                            Digita la tua email per il recupero
                                        </InputLabel>
                                        <FilledInput
                                            id="email"
                                            fullWidth
                                            type="email"
                                            value={email}
                                            error={!!errors.email}
                                            {...register("email", { 
                                                required: "Campo obbligatorio",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Formato errato della email",
                                                },
                                            })}
                                            onChange={event => setEmail(event.target.value)}
                                        />
                                        {errors.email && <label className="error-text">{errors.email.message}</label>}
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Button
                                        disabled={!isValid}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            setStage(2);
                                        }}
                                    >
                                        Invia codice di recupero
                                    </Button>
                                </Box>
                            </Box>
					    </form>
                    )}

                    {stage===2 && (
                        <form onSubmit={handleSubmit(formSubmitHandler)}>
                            <Box>
                                <Box className="headingForm">Recupero password</Box>
                                <Box className="formField">
                                    <FormControl fullWidth>
                                        <InputLabel variant="filled" sx={{ color: "#666666" }}>
                                            Codice di recupero
                                        </InputLabel>
                                        <FilledInput
                                            id="code"
                                            fullWidth
                                            type="text"
                                            value={code}
                                            error={!!errors.code}
                                            {...register("code", { 
                                                required: "Campo obbligatorio",
                                            })}
                                            onChange={event => setCode(event.target.value)}
                                        />
                                        {errors.code && <label className="error-text">{errors.code.message}</label>}
                                    </FormControl>
                                </Box>
                                <Box className="formField">
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel variant="filled">Nuova password</InputLabel>
                                        <FilledInput
                                            id="newPassword"
                                            fullWidth
                                            type="password"
                                            error={!!errors.newPassword}
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
                                        <InputLabel variant="filled">Conferma password</InputLabel>
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
                                        onClick={() => {
                                            setStage(3);
                                        }}
                                    >
                                        Cambia password
                                    </Button>
                                </Box>
                            </Box>
					    </form>
                    )}

                    {stage===3 && (
                        <Navigate to="/login" />
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
