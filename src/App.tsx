import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";
import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { queryClient } from "@/queries";
import { Auth, Amplify } from 'aws-amplify';
import { AuthProvider, useAuth } from "./stores/AuthProvider";

Amplify.configure({
	Auth: {
	  region: 'eu-central-1',
	  userPoolId: 'eu-central-1_OcyZlYZEj',
	  userPoolWebClientId: '7d5ij9ol01l2405r2i5d4vgdvo'
	}
});

function App() {
	const user = localStorage.getItem('currentUser');
	// console.log(Auth.currentUserInfo()); // to see user attributes

	return (
		<ThemeProvider theme={defaultTheme}>
			<AuthProvider authenticated={user !== null ? true : false}>
				<QueryClientProvider client={queryClient}>
					<AppRoutes />
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
