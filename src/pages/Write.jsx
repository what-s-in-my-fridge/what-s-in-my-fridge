import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Write = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const isEditMode = location.state && location.state.isEditMode;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/myinfo');
        const { nickname } = response.data;
        setNickname(nickname);
        setLoading(false);
      } catch (error) {
        setNickname('no_nickname');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchPostData = async () => {
        try {
          const response = await axios.get(`/post/${id}`);
          const { title, contents, nickname, image } = response.data;
          setTitle(title);
          setContents(contents);
          setNickname(nickname);
          setImage(image);
          setLoading(false);
        } catch (error) {
          alert('글을 불러오는데 오류가 발생했습니다.');
        }
      };

      fetchPostData();
    }
  }, [isEditMode, id]);

  useEffect(() => {
    if (nickname === 'no_nickname') {
      alert('글을 쓰기 위해서 로그인이 필요합니다!');
      // navigate("/SignIn");
    }
  }, [isEditMode, loading, nickname]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // 선택한 이미지 파일 업데이트
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        const shouldUpdate = window.confirm('수정하시겠습니까?');
        if (shouldUpdate) {
          const formData = new FormData(); // FormData 객체 생성
          formData.append('title', title); // 제목 추가
          formData.append('contents', contents); // 본문 추가
          if (image) {
            formData.append('image', image); // 이미지 파일 추가
          }

          // 글 수정 요청 처리
          axios.put(`/post/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // 이미지 업로드를 위한 헤더 설정
            },
          });
          alert('글이 성공적으로 수정되었습니다.');
          navigate(`/post/${id}`);
        }
      } else {
        const shouldSubmit = window.confirm('작성하시겠습니까?');
        if (shouldSubmit) {
          const formData = new FormData(); // FormData 객체 생성
          formData.append('title', title); // 제목 추가
          formData.append('contents', contents); // 본문 추가
          if (image) {
            formData.append('image', image); // 이미지 파일 추가
          }

          // 글 작성 요청 처리
          await axios.post('/post/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // 이미지 업로드를 위한 헤더 설정
            },
            withCredentials: true, // credential 옵션 추가
          });

          alert('글이 성공적으로 저장되었습니다.');
          navigate('/Community');
        }
      }
    } catch (error) {
      alert('글 저장에 실패했습니다..');
      if (isEditMode) {
        navigate(`/post/${id}`);
      } else {
        navigate('/Community');
      }
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <Sidebar />
      <div className="fixed top-0 right-0 mt-4 mr-4 flex items-center justify-center h-10 rounded-1xl border-sky-900">
        <span className="Jua-font text-blue-900 text-2xl">{nickname}</span>
      </div>
      <div className="flex flex-col pt-10 items-center justify-center flex-grow">
        <div className="p-4 w-5/6 border-project rounded-lg">
          <div>
            <input
              className="px-4 font-bold text-2xl w-full border-2 border-sky-900 rounded-lg bg-blue-50 text-sky-900"
              type="text"
              placeholder="제목을 작성하세요!"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="mt-2 p-1 rounded-lg border-2 border-sky-900">
            <textarea
              className="w-full h-96 resize-none outline-none bg-blue-50 text-sky-900"
              placeholder="본문을 입력하세요!"
              maxLength={'1000'}
              value={contents}
              onChange={handleContentsChange}
              required
            />
          </div>
          <div className="p-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange} // 이미지 파일 선택 핸들러
            />
          </div>
          <div className="pt-6 flex justify-end">
            <input
              className="Jua-font border-2 border-sky-900 p-2 rounded-2xl bg-blue-300 blue-600 hover:bg-blue-600"
              type="button"
              value={isEditMode ? '수정하기' : '작성하기'}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
