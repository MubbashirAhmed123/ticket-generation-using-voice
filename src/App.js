import React,{useState,useEffect} from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Page1 from './Pages/Page1';
import Form from './Form';
import Page3 from './Pages/Page3'
import Help from './Pages/Help';
import Page4 from './Pages/Page4'
import Page5 from './Pages/Pag5';
import Page6 from './Pages/Page6';
import Page7 from './Pages/Page7';
function App() {
  const[langform,setLangForm]=useState(false)
  const[lang,setLang]=useState('')
  useEffect(()=>{
  setLangForm(true)
  
  // eslint-disable-next-line
  },[])
  const handleChange=(e)=>{
    setLang(e.target.value)
  }
  return (
  <> 
  <div className={langform?`absolute top-[20%] left-[40%] hidden`:``}>
  <div className='flex flex-col '>
  <form className='bg-gray-800 p-2 text-white' >
    <h1 className='text-xl font-bold p-2'>Select Your prefferd language</h1>
    <div className='p-2 text-xl font-bold'>
    <label htmlFor="lang">Select English</label>
    <input type="radio" name="lang" id="lang" value='English' checked={lang==='English'} className='mx-2'  onChange={handleChange} />
    </div>
    <div className='p-2 text-xl font-bold'>
    <label htmlFor="lang">Select Hindi</label>
    <input type="radio" name="lang" id="lang" value='Hindi' checked={lang==='Hindi'} className='mx-2'  onChange={handleChange} />
    </div>
  </form>
    </div>
  </div>
<BrowserRouter>
<Header></Header>
<Routes>
<Route path='/' element={<Page1/>}/>
<Route path='/form' element={<Form lang={lang}/>}/>
<Route path='/Page3' element={<Page3 lang={lang}/>}/>
<Route path='/Page4' element={<Page4 lang={lang}/>}/>
<Route path='/Page5' element={<Page5 lang={lang}/>}/>
<Route path='/Page6' element={<Page6 lang={lang}/>}/>
<Route path='/Page7' element={<Page7/>}/>
<Route path='/Help' element={<Help/>}/>
</Routes>
<Footer></Footer>
</BrowserRouter>
  </>  
  );
 
}

export default App;
