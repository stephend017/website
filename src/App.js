import React from 'react';
import { Typography, ThemeProvider, CssBaseline, useTheme } from '@material-ui/core'
import './App.css';

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
        <CssBaseline />
        <div style={{ paddingLeft: 64, paddingTop: 48}}>

          <Typography variant="h2" style={{ fontWeight: 'bold', fontSize: '5em' }}>
            Stephen Davis
          </Typography>
          <div style={{ height: 16 }}></div>
          <Typography variant="h6" style={{ fontWeight: 'lighter', maxWidth: '67%' }}>
            My name is Stephen Davis I live in West Lafayette, Indiana and I am currently a Junior 
            in Purdue Computer Science. I am a software engineer with experience in both frontend 
            and backend technologies. My hobbies include programming, cooking, hiking and watching 
            basketball. Along with my coursework I tutor and do research with Cam2 here at Purdue.
          </Typography>

          <div style={{ height: 64 }} />
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Languages & Technologies
          </Typography>
          <div style={{ height: 32 }} />

          <div style={{ width: '50%' }}>
            <Tag text='react' color='#61dbfb' isBold />
            <Tag text='typescript' color='#007acc' />
            <Tag text='javascript' color='#f7df1e' />
            <Tag text='HTML 5' color='#F16529' isBold />
            <Tag text='C' color='#00589d' isBold />
            <Tag text='C++' color='#00589d' isBold />
            <Tag text='C#' color='#68217a' isBold />
            <Tag text='Java' color='#d32d23' />
            <Tag text='Angular' color='#e02937' />
            <Tag text='ARM' color='#222' isBold/>
            <Tag text='python' color='#376e9e' isBold/>
            <Tag text='git' color='#f05033' isBold />
            <Tag text='perforce' color='#2f6db5' isBold />
          </div>

          <div style={{ height: 64 }} />
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Experience
          </Typography>
          <div style={{ height: 8 }} />
          <Typography variant="h6" style={{ fontWeight: 'bold', color:'#005dab' }}>
            Qualcomm
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 'lighter', maxWidth: '33%' }}>
            I was a Testing Automation Engineer here in the summer of 2019. I was on the WIFI 6
            Android team and I worked with both <b style={{color: '#68217a', fontWeight: 'bold'}}>C# </b> 
            and <b style={{color: '#376e9e', fontWeight: 'bold'}}> python</b>. My main project was focused 
            around automating the execution of test cases, and data collection of test case 
            results. A notable achievement from the summer was placing top 10 in the intern 
            hackathon.
          </Typography>
          <div style={{ height: 16 }} />
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Bloomberg
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 'lighter', maxWidth: '33%' }}>
            I will be interning here as a software engineer in 2020!
          </Typography>
        </div>
      </ThemeProvider>
    </div>
  );
}

function Tag({ text, color, isBold }) {
  const theme = useTheme();
  return (
    <Typography
      style={{
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 16,
        paddingLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        borderRadius: 4,
        display: 'inline-block',
        backgroundColor: color,
        color: theme.palette.getContrastText(color),
        fontSize: '1.5em',
        fontWeight: isBold ? 'bold' : 'normal',
        boxShadow: '0px 16px 32px 0px rgba(156,156,156,0.5)'

      }}
      variant='subtitle2'
    >
      {text}
    </Typography>
  );
}

export default App;
