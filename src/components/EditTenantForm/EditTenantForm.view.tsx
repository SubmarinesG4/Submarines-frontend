import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Controller, set, useForm } from "react-hook-form";
import { EditTenantFormProps } from "./EditTenantForm.types";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "@/app/services/helpers";
import {
  useGetTenantQuery,
  useUpdateTenantMutation,
} from "@/app/services/tenantsApiSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import useLogic from "./EditTenantForm.logic";

const languages = ["en", "de", "it", "es", "fr"];

export default function View(props: EditTenantFormProps) {
  const { tenant, isLoading } = useLogic({ id: props.tenantName });
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      languages: tenant?.listAvailableLanguages ?? [],
      numberOfTranslations: tenant?.numberTranslationAvailable ?? 0,
      defaultLanguage: tenant?.defaultTranslationLanguage ?? "",
    },
  });
  const [updateTenant] = useUpdateTenantMutation();

  const handleFormSubmit = (data: any) => {
    updateTenant({
      tenantName: tenant!.tenantName,
      listAvailableLanguages: data.languages,
      numberTranslationAvailable: Number(data.numberOfTranslations),
      defaultTranslationLanguage: data.defaultLanguage,
    })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        props.closeDrawer();
      })
      .catch((err) => {
        if (isFetchBaseQueryError(err)) {
          let errMsg =
            "error" in err
              ? err.error
              : JSON.stringify(err.data).substring(0, 100) + "...";
          console.log(errMsg);
          props.showError(errMsg);
        } else if (isErrorWithMessage(err)) {
          console.log(err.message);
          props.showError(err.message);
        }
      });
  };

  if (isLoading)
    return <Box sx={{ width: "auto", padding: "1em 1em" }}>Loading...</Box>;
  else {
    return (
      <Box sx={{ width: "auto", padding: "1em 1em" }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Typography variant="h5" sx={{ marginBottom: "0.5em" }}>
            Modifica Tenant
          </Typography>
          <TextField
            id="numberOfTranslations"
            label="Numero traduzioni"
            {...register("numberOfTranslations", { required: true })}
            sx={{ width: "70%", margin: "0 15% 20px 15%" }}
          />
          <FormControl sx={{ width: "70%", margin: "0 15% 20px 15%" }}>
            <InputLabel>Languages</InputLabel>
            <Controller
              name="languages"
              control={control}
              //defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Select
                  multiple
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  input={<OutlinedInput label="Multiple Select" />}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((v) => (
                        <Chip
                          key={v}
                          label={v}
                          onDelete={() => {
                            onChange(value.filter((item) => item !== v));
                          }}
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {languages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button
              variant="outlined"
              type="button"
              sx={{ marginX: "0.5em" }}
              onClick={props.closeDrawer}
            >
              Chiudi
            </Button>
            <Button variant="contained" type="submit" sx={{ marginX: "0.5em" }}>
              Modifica
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
}
