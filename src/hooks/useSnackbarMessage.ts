import { setMessage } from "@/app/slices/messagesSlice";
import { useAppDispatch } from "@/app/store";

type useSnackbarMessageReturn = (message: string) => void

export const useSnackbarMessage = (): useSnackbarMessageReturn => {
	const dispatch = useAppDispatch();

	function setSnackbarMessage(message: string) {
		dispatch(setMessage(message));
	}

	return setSnackbarMessage
}


