import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { Amplify } from "aws-amplify";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";
import AppSnackbar from "./components/AppSnackbar";

Amplify.configure({
	Auth: {
		region: import.meta.env.VITE_AMP_REGION,
		userPoolId: import.meta.env.VITE_AMP_USERPOOL,
		userPoolWebClientId: import.meta.env.VITE_AMP_WEB_CLIENT_ID,
	},
});

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
				<Provider store={store}>
					<AppSnackbar />
					<AppRoutes />
				</Provider>
			</LocalizationProvider>
		</ThemeProvider>
	);
}

export default App;
