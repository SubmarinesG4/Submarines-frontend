import { setMessage } from "@/app/slices/messagesSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { UseSnackbarReturn } from "./AppSnackbar.types";

function useLogic(): UseSnackbarReturn {
	const message = useAppSelector((state) => state.messagesSlice.message);
	const dispatch = useAppDispatch();

	function emptyMessage() {
		dispatch(setMessage(null));
	}

	return { message, emptyMessage };
}

export default useLogic;
