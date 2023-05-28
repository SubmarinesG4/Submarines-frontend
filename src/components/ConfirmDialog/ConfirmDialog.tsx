import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

type ConfirmDialogProps = {
	action: () => Promise<void>;
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	description: string;
};

export default function ConfirmDialog({ action, open, setOpen, title, description }: ConfirmDialogProps) {
	const handleYes = async () => {
		await action();
		setOpen(false);
	};

	const handleNo = async () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleNo}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleYes}>Sì</Button>
				<Button onClick={handleNo} autoFocus>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
}
