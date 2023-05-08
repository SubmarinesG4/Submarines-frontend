import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tenant 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lingua default tenant
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Descrizione tenant
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
