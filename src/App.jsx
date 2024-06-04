import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Home,
  MyFridge,
  ShowRecipes,
  Community,
  AddIngredients,
  EditIngredients,
  SignIn,
  SignUp,
  Write,
  Post,
} from './pages';

import Context from './components/Context';
import './index.css';
import { useState } from 'react';

function App() {
  const [isSidebarOpened, setisSidebarOpened] = useState(false);
  const handleSidebar = (isSidebarOpened) => {
    setisSidebarOpened(!isSidebarOpened);
  };

  return (
    <Context.Provider value={{ isSidebarOpened, handleSidebar }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/MyFridge" element={<MyFridge />}></Route>
          <Route path="/ShowRecipes" element={<ShowRecipes />}></Route>
          <Route path="/Community" element={<Community />}></Route>
          <Route path="/AddIngredients" element={<AddIngredients />}></Route>
          <Route path="/EditIngredients" element={<EditIngredients />}></Route>
          <Route path="/board/:id" element={<Community />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Write" element={<Write />}></Route>
          <Route path="/Write/:id" element={<Write />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
