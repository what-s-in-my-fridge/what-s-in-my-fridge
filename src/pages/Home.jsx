import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const fetchNickname = async () => {
    try {
      setNickname('no_nickname');
      const response = await axios.get('http://127.0.0.1:5000/myinfo', {
        withCredentials: true,
      });
      if (response.data === '로그인 해주세요!') {
        alert('로그인해 주세요!');
      } else {
        setNickname(response.data);
      }
    } catch (e) {
      alert('서버와 연결되지 않았습니다.');
      console.log('정보제공 오류 => ' + e);
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://127.0.0.1:5000/logout', {
        withCredentials: true,
      });
      setNickname('no_nickname');
      navigate('/SignIn');
    } catch (e) {
      alert('로그아웃 실패.');
      console.log('로그아웃 오류 => ' + e);
    }
  };

  useEffect(() => {
    fetchNickname();
  }, []);

  useEffect(() => {
    const disableImageActions = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('contextmenu', disableImageActions);
      img.addEventListener('dragstart', disableImageActions);
      img.addEventListener('mousedown', disableImageActions);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('contextmenu', disableImageActions);
        img.removeEventListener('dragstart', disableImageActions);
        img.removeEventListener('mousedown', disableImageActions);
      });
    };
  }, []);

  return (
    <div className="bg-blue-100 h-screen flex flex-col items-center font-sans text-center relative">
      <Sidebar />
      <div className="Jua-font text-blue-900 text-2xl absolute right-0 mr-4 rounded-1xl border-sky-900 cursor-pointer">
        {nickname === 'no_nickname' ? (
          <button
            onClick={() => {
              navigate('/SignIn');
            }}
            className=""
          >
            로그인
          </button>
        ) : (
          <div className="flex items-center">
            <div className="ml-auto">{nickname}</div>
            <button
              onClick={logout}
              className="ml-4 p-2 bg-red-500 text-white rounded"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-5">
        <img
          id="what-in-my-refridge"
          src="/images/logo.png"
          alt="프로젝트 이미지"
          className="max-w-64 h-auto"
        />
      </div>
      <div
        id="root"
        className="w-11/12 bg-blue-100 p-5 rounded-2xl flex flex-col items-center space-y-8 mt-32"
      >
        <div className="block w-full">
          <div
            className="bg-blue-200 border-sky-900 rounded-2xl flex items-center justify-center border-4 h-36 w-full"
            onClick={() => navigate('/MyFridge')}
          >
            <img
              id="MyFridge"
              src="/images/fridge.png"
              alt="나의 냉장고"
              className="max-w-full h-32"
            />
          </div>
        </div>
        <div className="block w-full">
          <div
            className="bg-blue-200 border-sky-900 rounded-2xl flex items-center justify-center border-4 h-36 w-full"
            onClick={() => navigate('/ShowRecipes')}
          >
            <img
              id="ShowRecipes"
              src="/images/recipe.png"
              alt="레시피 추천"
              className="max-w-full h-32"
            />
          </div>
        </div>
        <div className="block w-full">
          <div
            className="bg-blue-200 border-sky-900 rounded-2xl flex items-center justify-center border-4 h-36 w-full"
            onClick={() => navigate('/Community')}
          >
            <img
              id="Community"
              src="/images/community.png"
              alt="커뮤니티"
              className="max-w-full h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
