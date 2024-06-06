import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Community = () => {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const printFetchError = (error) => {
    console.error('정보를 불러오는데 오류가 발생했습니다.', error);
    alert('정보를 불러오는데 오류가 발생했습니다. 다시 시도해 주세요.');
  };

  const getBoardList = async (pageNumber) => {
    try {
      const resp = await axios.get(`/post/${pageNumber}`, {
        withCredentials: true,
      });
      setPostList(resp.data.data);
      setTotalPages(resp.data.totalPages);
    } catch (err) {
      printFetchError(err);
    }
  };

  useEffect(() => {
    const pageNumberToFetch = pageNumber ? parseInt(pageNumber) : currentPage;
    getBoardList(pageNumberToFetch);
  }, [pageNumber, currentPage]);

  useEffect(() => {
    setIsPreviousDisabled(currentPage <= 1);
    setIsNextDisabled(currentPage >= totalPages);
  }, [currentPage, totalPages]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-blue-100 flex flex-col text-center relative min-h-screen">
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl mt-4 sticky top-0 bg-blue-100 flex items-center justify-center relative">
        <div>커뮤니티</div>
        <button
          className="Jua-font text-blue-900 text-2xl absolute right-0 mr-4 border-sky-900"
          onClick={() => {
            navigate('/Write');
          }}
        >
          글작성
        </button>
      </div>
      <div className="w-full">
        <div>
          <hr className="custom-hr-Community" />
        </div>
        <div className="w-full">
          {postList && postList.length > 0 ? (
            postList.map((post) => (
              <li key={post.id} className="flex flex-col w-full text-left">
                <Link to={`/post/${post.id}`}>
                  <div className="w-full sm:w-64 ml-3 overflow-hidden">
                    <span className="Jua-font text-blue-900 text-2xl">
                      {post.title}
                    </span>
                    <br></br>
                    <span className="Jua-font text-blue-900 text-1xl truncate block">
                      {post.contents}
                    </span>
                  </div>
                  <hr className="custom-hr-Community w-full" />
                </Link>
              </li>
            ))
          ) : (
            <div>게시물이 없습니다.</div>
          )}
        </div>
        <div className="mb-4 m-2">
          <button
            className="Jua-font border-2 border-sky-900 bg-blue-200 p-1 rounded-2xl"
            disabled={isPreviousDisabled}
            onClick={goToPreviousPage}
          >
            이전페이지
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="Jua-font border-2 border-sky-900 bg-blue-200 p-1 rounded-2xl"
            disabled={isNextDisabled}
            onClick={goToNextPage}
          >
            다음페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
