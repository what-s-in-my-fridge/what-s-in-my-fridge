import { useContext, useEffect, useState } from 'react';
import Context from './Context';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpened, handleSidebar } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(isSidebarOpened);

  useEffect(() => {
    setMenuOpen(isSidebarOpened);
  }, [isSidebarOpened]);

  // 경로 변경 시 사이드바 닫기
  useEffect(() => {
    if (menuOpen) {
      handleSidebar(false);
      setMenuOpen(false);
    }
  }, [location]);

  const toggleMenu = () => {
    handleSidebar(!menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {!menuOpen && (
        <label htmlFor="menuToggle" className="menu-icon" onClick={toggleMenu}>
          <img
            id="menu"
            src="/images/sidebar.png"
            alt="슬라이드 메뉴"
            className="w-8 h-8"
          />
        </label>
      )}
      <input
        type="checkbox"
        id="menuToggle"
        className="hidden"
        checked={menuOpen}
        onChange={toggleMenu}
      />
      {menuOpen && <div className="overlay show"></div>} {/* 오버레이 추가 */}
      <div className={`slide-menu ${menuOpen ? 'left-0' : 'left-[-300px]'}`}>
        <div className="p-5">
          <ul>
            <li
              onClick={() => navigate('/')}
              className={
                'Jua-font block py-2 text-blue-900 text-4xl cursor-pointer'
              }
            >
              냉장고를 부탁해
            </li>
            <hr className="custom-hr" />
            <li
              onClick={() => navigate('/MyFridge')}
              className="Jua-font block py-2 text-blue-900 text-4xl cursor-pointer"
            >
              나의 냉장고
            </li>
            <hr className="custom-hr" />
            <li
              onClick={() => navigate('/ShowRecipes')}
              className="Jua-font block py-2 text-blue-900 text-4xl cursor-pointer"
            >
              레시피 보기
            </li>
            <hr className="custom-hr" />
            <li
              onClick={() => navigate('/Community')}
              className="Jua-font block py-2 text-blue-900 text-4xl cursor-pointer"
            >
              커뮤니티
            </li>
            <hr className="custom-hr" />
          </ul>
          <label
            htmlFor="menuToggle"
            className="Jua-font cursor-pointer text-sky-900 text-4xl"
            onClick={toggleMenu}
          >
            닫기
          </label>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
