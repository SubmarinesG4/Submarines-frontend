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
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				minHeight: "100vh",
				backgroundColor: "#f5f5f5",
				flexDirection: "column",
			}}
		>
			<Card sx={{ maxWidth: "350px", minWidth: "300px", mt: 2 }}>
				<CardContent>
					<form onSubmit={handleSubmit(formSubmitHandler)}>
						<Box>
							<Box sx={{ mb: 1 }}>
								<FormControl fullWidth>
									<InputLabel variant="filled" sx={{ color: "#666666" }}>
										email
									</InputLabel>
									<FilledInput
										fullWidth
										type="text"
										id="email"
										error={!!errors.email}
										{...register("email", { required: true })}
									/>
								</FormControl>
							</Box>
							{/* password */}
							<Box sx={{ mb: 3 }}>
								<FormControl fullWidth variant="outlined">
									<InputLabel variant="filled">password</InputLabel>
									<FilledInput
										id="password"
										fullWidth
										type="password"
										error={!!errors.password}
										{...register("password", { required: true })}
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
									Submit
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
