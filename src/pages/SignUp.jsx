import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onClickSignUp = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) alert('비밀번호가 다릅니다');
    else {
      const signupData = { id: id, nickname: nickname, password: password };
      axios
        .post('http://127.0.0.1:5000/signup', signupData, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다.');
            navigate('/');
          }
        })
        .catch((e) => {
          alert('s');
          console.log('회원가입 오류 => ' + e);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 font-sans">
      <div className="bg-blue-100 p-6 rounded-lg w-80">
        <h2 className="Jua-font text-black mb-6 text-3xl text-center font-bold">
          회원가입
        </h2>
        <form onSubmit={onClickSignUp}>
          <label htmlFor="id" className="block mb-2 Jua-font">
            아이디
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={onChangeId}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
          />

          <label htmlFor="nickname" className="block mb-2 Jua-font">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
          />

          <label htmlFor="password" className="block mb-2 Jua-font">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
          />

          <label htmlFor="passwordConfirm" className="block mb-2 Jua-font">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
          />

          <button
            onClick={onClickSignUp}
            className="Jua-font mt-6 w-full p-2 text-white bg-blue-900 rounded hover:bg-blue-800"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
