import { TenantDetailed } from "@/types/Tenant";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

type TenantDetailsProps = {
	tenant: TenantDetailed;
};

function TenantDetails({ tenant }: TenantDetailsProps) {
	const {
		tenantName,
		token,
		defaultTranslationLanguage,
		listAvailableLanguages,
		numberTranslationUsed,
		numberTranslationAvailable,
	} = tenant;

	return (
		<Paper sx={{ overflow: "hidden", margin: "20px" }}>
			<Box sx={{ padding: "20px" }}>
				<Typography variant="h5">{tenantName}</Typography>
				<Typography variant="body1">{token}</Typography>
				<Typography variant="body1">{defaultTranslationLanguage}</Typography>
				<div>
					{listAvailableLanguages?.map((el: any) => (
						<Typography variant="body1" component={"span"} key={el}>
							{el}
						</Typography>
					))}
				</div>
				<Typography variant="body1">
					{numberTranslationUsed}/{numberTranslationAvailable}
				</Typography>
				<Typography variant="body1">{tenantName}</Typography>
			</Box>
		</Paper>
	);
}

export default TenantDetails;
