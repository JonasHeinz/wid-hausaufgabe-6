import {Grid2, Select, MenuItem, TextField, Button, Box, Typography, InputLabel} from '@mui/material'
import { useState } from 'react'

function Transformer() {
    const [transformation, setTransformation] = useState("wgs84tolv95")

    const [easting, setEasting] = useState(0)
    const [northing, setNorthing] = useState(0)

    const [newEasting, setNewEasting] = useState(0.0)
    const [newNorthing, setNewNorthing] = useState(0.0)


    async function transform(){
        try {
            const resp = await fetch(`https://geodesy.geo.admin.ch/reframe/${transformation}?northing=${northing}&easting=${easting}`);
            const json = await resp.json();
            if(resp.ok){
              setNewEasting(json.coordinates[0]);
              setNewNorthing(json.coordinates[1]);
          }else{
              throw new Error("Error fetching data")
          }
      
          } catch (err) {
            console.log(err);
          }
    }
  return (   
    <Box sx={{ flexGrow: 1 }} className="box">
      <Typography variant="h4" gutterBottom>Coordinate Transform</Typography>
      <Grid2 container spacing={2}>
          <Grid2 size={6}  >
            <InputLabel id="reframe-label">REFRAME Service</InputLabel>
            <Select  label="REFRAME Service" fullWidth value={transformation} onChange={(e)=>setTransformation(e.target.value)}>
              <MenuItem value="wgs84tolv95">WGS84 to LV95</MenuItem>
              <MenuItem value="lv95towgs84">LV95 to WGS84</MenuItem>
            </Select>
          </Grid2>
          <Grid2 xs={6}/> 
          <Grid2 size={6} >
            <TextField label="Easting" fullWidth onChange={(e)=>setEasting(e.target.value)}/>
          </Grid2>
          <Grid2 size={6}>
            <TextField label="Northing" fullWidth onChange={(e)=>setNorthing(e.target.value)}/>
          </Grid2>
          <Grid2 size={12}>
            <Button fullWidth variant="contained" onClick={transform}>Transform</Button>
          </Grid2>
          <Grid2 size={6}>
            <TextField label="Transformed X" fullWidth disabled value={newEasting}/>
          </Grid2>
          <Grid2 size={6}>
            <TextField label="Transformed Y" fullWidth disabled  value={newNorthing}/>
          </Grid2>
      </Grid2>
   </Box>
  )
}

export default Transformer
