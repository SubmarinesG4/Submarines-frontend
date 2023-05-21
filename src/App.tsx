import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";
import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { Auth, Amplify } from "aws-amplify";
import { AuthProvider } from "./stores/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";

Amplify.configure({
  Auth: {
    region: "eu-central-1",
    userPoolId: "eu-central-1_57mvV5N7n",
    userPoolWebClientId: "snftpb6f6bsdaphl7rv34lnl",
  },
});

function App() {
  const user = localStorage.getItem("webappUser");

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
