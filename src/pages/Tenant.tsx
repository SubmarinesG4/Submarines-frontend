import { useGetTenantQuery } from "@/app/services/api";
import NavBar from "@/components/NavBar";
import { useParams } from "react-router-dom";

export default function Tenant() {
	let { id } = useParams();
	if (!id) return <>error</>;

	const { data } = useGetTenantQuery({ id });

	return (
		<div>
			<NavBar />
			{id}
		</div>
	);
}
