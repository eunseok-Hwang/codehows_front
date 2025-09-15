
import { AppBar, Button, Tab, Tabs, Toolbar } from '@mui/material'
import './App.css'
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Mainpage from './page/Mainpage';
import { useEffect, useState } from 'react';
import Korean from './page/Korean';
import Signup from './page/Signup';
import Login from './page/Login';
import { useAuthState } from './store';
import Chinese from './page/Chinese';
import Japanese from './page/Japanese';
import West from './page/West';
import Addpage from './page/Addpage';
import ContentPage from './page/ContentPage';

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function App() {
  const { isAuthenticated, logout } = useAuthState();
  const [value, setValue] = useState<number>(-1);
  const navigate = useNavigate();

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    sessionStorage.setItem("jwt", "");
    logout();
    navigate("/");
  }

  const navigateMain = () => {
    setValue(-1);
    navigate("/");
  }

  const handelOpen = () => {
    navigate('/board/post');
  }

  useEffect(() => {
    if (value === 0) navigate("/korean-food");
    if (value === 1) navigate("/chinese-food");
    if (value === 2) navigate("/japanese-food");
    if (value === 3) navigate("/western-food");
  }, [value]);

  return (
    <>
      <AppBar position="static" elevation={0} className="bg-white border-b border-gray-200">
        <Toolbar className="flex justify-between items-center max-w-7xl mx-auto w-full px-4">

          {/* 왼쪽: 메인 페이지 링크 */}
          <div className="flex-shrink-0">
            <button
              onClick={navigateMain}
              className="text-amber-400 text-xl font-bold hover:text-amber-500">
              세계음식
            </button>
          </div>

          {/* 가운데: 게시판 메뉴 */}
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="한식" {...a11yProps(1)} />
            <Tab label="중식" {...a11yProps(2)} />
            <Tab label="일식" {...a11yProps(3)} />
            <Tab label="양식" {...a11yProps(4)} />
            {isAuthenticated && (
              <Button color='inherit' onClick={handelOpen}>새 게시글</Button>
            )}
          </Tabs>
          {/* <Tabs>
          <Tab label="한식" />
          <Tab label="일식" />
          <Tab label="중식" />
          <Tab label="양식" />
          <Link to="/chinese" className="text-gray-700 hover:text-blue-500">중식</Link>
          <Link to="/western" className="text-gray-700 hover:text-blue-500">양식</Link>
          <Link to="/japanese" className="text-gray-700 hover:text-blue-500">일식</Link>
        </Tabs> */}

          {/* 오른쪽: 로그인/회원가입/로그아웃 */}
          <div className="flex space-x-4">
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-gray-600 hover:text-green-500">로그인</Link>
                <Link to="/signup" className="text-gray-600 hover:text-green-500">회원가입</Link>
              </>
            )}
            {isAuthenticated && (
              <Button color='secondary' onClick={handleLogout} className="text hover:text-red-500">로그아웃</Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path='/korean-food' element={<Korean />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chinese-food' element={<Chinese />} />
        <Route path='/japanese-food' element={<Japanese />} />
        <Route path='/western-food' element={<West />} />
        <Route path='/board/post' element={<Addpage />} />
        <Route path='/boards/:id' element={<ContentPage />} />
      </Routes>



    </>
  )
}

export default App
