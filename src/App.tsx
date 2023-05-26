import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { Amplify } from "aws-amplify";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";

Amplify.configure({
	Auth: {
		region: "eu-central-1",
		userPoolId: "eu-central-1_OcyZlYZEj",
		userPoolWebClientId: "7d5ij9ol01l2405r2i5d4vgdvo",
	},
});

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
				<Provider store={store}>
					<AppRoutes />
				</Provider>
			</LocalizationProvider>
		</ThemeProvider>
	);
}

export default App;
