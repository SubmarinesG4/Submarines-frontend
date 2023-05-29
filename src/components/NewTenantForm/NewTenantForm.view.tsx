import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Controller, useForm } from "react-hook-form";
import { NewTenantFormProps } from "./NewTenantForm.types";
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
import useNewTranslationList from "./NewTenantForm.logic";
import { usePutTenantMutation } from "@/app/services/tenantsApiSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

const languages = ["en", "de", "it", "es", "fr"];

export default function View(props: NewTenantFormProps) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      languages: [],
      tenantName: "",
      numberOfTranslations: 200,
      defaultLanguage: "",
    },
  });
  const [putNewTenant, putStatus] = usePutTenantMutation();
  const [availableLang, setAvailableLang] = useState<string[]>([]);
  const logic = useNewTranslationList({});

  const handleFormSubmit = (data: any) => {
    putNewTenant({
      tenantName: data.tenantName,
      defaultTranslationLanguage: data.defaultLanguage,
      listAvailableLanguages: data.languages,
      numberTranslationAvailable: Number(data.numberOfTranslations),
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

  return (
    <Box sx={{ width: "auto", padding: "1em 1em" }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h5">Nuovo Tenant</Typography>
        <TextField
          id="tenantName"
          label="TenantName"
          {...register("tenantName", { required: true })}
          sx={{ width: "70%", margin: "0 15% 20px 15%" }}
        />
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
            defaultValue={[]}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                multiple
                value={value}
                onChange={(e) => {
                  onChange(e);
                  setAvailableLang(e.target.value as string[]);
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
                          setAvailableLang(value.filter((item) => item !== v));
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
        {availableLang.length > 0 && (
          <FormControl sx={{ width: "70%", margin: "0 15% 20px 15%" }}>
            <InputLabel>DefaultLanguage</InputLabel>
            <Controller
              name="defaultLanguage"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={availableLang.includes(value) ? value : ""}
                  onChange={onChange}
                  input={<OutlinedInput label="Select default language" />}
                >
                  {availableLang.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        )}
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
            Salva
          </Button>
        </Box>
      </form>
    </Box>
  );
}
