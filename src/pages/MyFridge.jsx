import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://210.109.52.15:80/get", {
        withCredentials: true,
      });
      if (response.data === "로그인해주세요!") {
        navigate("/");
      } else {
        const serverData = response.data;

        const today = new Date();
        const newData = serverData.map((item) => {
          const expireDate = new Date(item.expireDate);
          const diffTime = expireDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return {
            ...item,
            dDay: diffDays,
          };
        });

        setIngredients(newData);
      }
    } catch (e) {
      alert("서버와 연결되지 않았습니다.");
      console.log("데이터 불러오기 오류 => " + e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-blue-100 flex flex-col min-h-screen">
      <div className="flex justify-center items-center w-full mt-4 p-2">
        <button
          className="Jua-font border-2 border-sky-900 bg-blue-200 p-2 rounded-2xl select-none"
          onClick={() => navigate("/AddIngredients")}
        >
          재료추가
        </button>
        <div className="Jua-font text-blue-900 text-4xl bg-blue-100 flex items-center justify-center relative mx-4">
          냉장고 보기
        </div>
        <button
          className="Jua-font border-2 border-sky-900 bg-blue-200 p-2 rounded-2xl select-none"
          onClick={() => navigate("/EditIngredients")}
        >
          재료수정
        </button>
      </div>
      <div className="w-full flex justify-center">
        <hr className="custom-hr w-full" />
      </div>
      <div className="w-full flex flex-col items-center">
        {ingredients.map((data) => (
          <div
            className="Jua-font w-full flex items-center p-2 border-b border-gray-300"
            key={data.id}
          >
            <div className="flex items-center">
              <div className="ml-4">
                <div>
                  {data.ingredient} {data.count} (
                  {data.ingredient === "고기" ? "g" : "개"})
                </div>
                <div className="text-sm text-gray-600">
                  {data.storeMethod === true ? "냉동보관" : "냉장보관"}
                </div>
              </div>
            </div>
            <div className="ml-auto text-right text-red-500 text-lg mr-4">
              D-{data.dDay}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFridge;
