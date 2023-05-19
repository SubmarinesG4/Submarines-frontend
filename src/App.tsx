import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";
import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { queryClient } from "@/queries";
import { Auth, Amplify } from "aws-amplify";
import { AuthProvider } from "./stores/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";

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
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
