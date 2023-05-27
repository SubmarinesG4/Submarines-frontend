import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { LayoutControllerProps, LayoutsProps } from "./LayoutsController.types";

export default function LayoutsController({ children }: LayoutControllerProps) {
	const location = useLocation();

	function getLayoutNameFromPath(path: string) {
		if (path.includes("login") || path.includes("resetPassword")) return "default";
		else return "withNavBar";
	}

	return <Layouts name={getLayoutNameFromPath(location.pathname)}>{children}</Layouts>;
}

function Layouts({ name, children }: LayoutsProps) {
	switch (name) {
		case "withNavBar":
			return (
				<>
					<NavBar />
					{children}
				</>
			);
		default:
			return <>{children}</>;
	}
}
