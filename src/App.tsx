import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";

import defaultTheme from "@/globals/defaultTheme";
import AppRoutes from "@/router/AppRoutes";
import { queryClient } from "@/queries";

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<QueryClientProvider client={queryClient}>
				<AppRoutes />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
