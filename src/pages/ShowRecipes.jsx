import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/search/5', {
          withCredentials: true,
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const handleClick = (recipeId) => {
    window.location.href = `https://www.10000recipe.com/recipe/${recipeId}`;
  };

  return (
    <div className="bg-blue-100 flex flex-col min-h-screen">
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl bg-blue-100 flex items-center justify-center relative mt-4 p-2">
        <div>레시피 보기</div>
      </div>
      <div className="w-full flex justify-center">
        <hr className="custom-hr w-full" />
      </div>
      <hr className="" />
      <div className="mt-8 px-4 md:px-8 lg:px-16">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4 transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div onClick={() => handleClick(recipe['레시피일련번호'][0])}>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                <a href="#" className="hover:underline">
                  {recipe['레시피제목'][0]}
                </a>
              </h3>
              <p className="text-lg">
                <span className="font-semibold">요리명:</span>{' '}
                {recipe['요리명'][0]}
              </p>
              <p className="text-lg">
                <span className="font-semibold">요리방법:</span>{' '}
                {recipe['요리방법별명'][0]}
              </p>
              <p className="text-lg">
                <span className="font-semibold">요리재료:</span>{' '}
                {recipe['요리재료별명'][0]}
              </p>
              <p className="text-lg">
                <span className="font-semibold">요리소개:</span>{' '}
                {recipe['요리소개'][0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRecipes;
