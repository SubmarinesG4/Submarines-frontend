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
        <Typography variant="h5" sx={{ marginBottom: "0.5em" }}>
          {tenantName}
        </Typography>
        <Typography variant="body1">
          <b>Token:</b> {token}
        </Typography>
        <Typography variant="body1">
          <b>Lingua di default:</b> {defaultTranslationLanguage}
        </Typography>
        <div>
          <b>Lingue disponibili:</b>{" "}
          {listAvailableLanguages?.map((el: any) => (
            <Typography variant="body1" component={"span"} key={el}>
              {el}{" "}
            </Typography>
          ))}
        </div>
        <Typography variant="body1">
          <b>Traduzioni:</b> {numberTranslationUsed} di{" "}
          {numberTranslationAvailable}
        </Typography>
        <Typography variant="body1">
          <b>Nome del tenant:</b> {tenantName}
        </Typography>
      </Box>
    </Paper>
  );
}

export default TenantDetails;
