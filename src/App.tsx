import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "react-query";
import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { Auth, Amplify } from 'aws-amplify';
import { AuthProvider, useAuth } from "./stores/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";

Amplify.configure({
	Auth: {
	  region: 'eu-central-1',
	  userPoolId: 'eu-central-1_OcyZlYZEj',
	  userPoolWebClientId: '7d5ij9ol01l2405r2i5d4vgdvo'
	}
});

function App() {
	const user = localStorage.getItem('currentUser');
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider authenticated={user !== null ? true : false}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
