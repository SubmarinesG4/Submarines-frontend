import NavBar from "../NavBar";
import { LayoutControllerProps } from "./LayoutsController.types";

function LayoutsController({ name, children }: LayoutControllerProps) {
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

export default LayoutsController;
