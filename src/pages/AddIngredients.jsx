import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        ingredient: "",
        count: 1,
        storeMethod: "냉장",
        expireDate: "",
      },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    setIngredients(
      ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleIncreaseCount = (index) => {
    setIngredients(
      ingredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, count: ingredient.count + 1 }
          : ingredient
      )
    );
  };

  const handleDecreaseCount = (index) => {
    setIngredients(
      ingredients.map((ingredient, i) =>
        i === index
          ? {
              ...ingredient,
              count: ingredient.count > 1 ? ingredient.count - 1 : 1,
            }
          : ingredient
      )
    );
  };

  const handleSubmit = () => {
    const selectedData = ingredients.map((ingredient) => ({
      ingredient: ingredient.ingredient,
      storeMethod: (ingredient.storeMethod === "냉장") ? true : false,
      expireDate: ingredient.expireDate || "2000-01-01",
      ingredientCount: ingredient.count,
    }));
    console.log(selectedData);
    axios
      .post("/add", selectedData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("저장되었습니다.");
          console.log(selectedData);
          navigate("/MyFridge");
        }
      })
      .catch(() => {
        alert("오류로 인해 재료가 저장되지 않았습니다.");
      });
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center font-sans text-center relative min-h-screen">
      <h2 className="Jua-font text-blue-900 text-4xl mt-4 top-0 bg-blue-100 flex items-center justify-center relative select-none">
        식재료 추가하기
      </h2>
      <div className="w-full flex justify-center">
        <hr className="custom-hr-EditIngredients w-full" />
      </div>
      <div className="w-full select-none">
        <ul className="text-left Jua-font text-xl">
          {ingredients.map((ingredient, index) => (
            <li
              className="w-full px-4 py-2 flex flex-col items-start border-b-4 border-blue-900 mt-4 mb-4"
              key={index}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  value={ingredient.ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredient", e.target.value)
                  }
                  placeholder="재료명"
                  className="border-2 border-blue-900 bg-blue-200 h-8 w-48 rounded-lg mr-2"
                />
                <button
                  onClick={() => handleDecreaseCount(index)}
                  className="border-2 border-blue-900 bg-blue-200 h-8 w-8 rounded-lg ml-1"
                >
                  -
                </button>
                <span className="mx-2">{ingredient.count}</span>
                <button
                  onClick={() => handleIncreaseCount(index)}
                  className="border-2 border-blue-900 bg-blue-200 h-8 w-8 rounded-lg"
                >
                  +
                </button>
              </div>
              <div className="flex w-full">
                <div className="mt-2 flex flex-col">
                  <label>
                    <input
                      type="radio"
                      name={`storage-${index}`}
                      value="냉장"
                      checked={ingredient.storeMethod === "냉장"}
                      onChange={() =>
                        handleIngredientChange(index, "storeMethod", "냉장")
                      }
                    />
                    냉장
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`storage-${index}`}
                      value="냉동"
                      checked={ingredient.storeMethod === "냉동"}
                      onChange={() =>
                        handleIngredientChange(index, "storeMethod", "냉동")
                      }
                    />
                    냉동
                  </label>
                </div>
                <div className="flex flex-col items-center justify-center pl-16">
                  <span>소비기한 </span>
                  <input
                    type="date"
                    value={ingredient.expireDate}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "expireDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemoveIngredient(index)}
                className="border-2 border-blue-900 bg-blue-200 h-8 w-16 rounded-lg mt-2 self-end"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="Jua-font border-2 border-blue-900 bg-purple-200 h-10 w-24 mt-4 rounded-lg mb-4"
        onClick={handleAddIngredient}
      >
        재료 추가하기
      </button>
      {ingredients.length > 0 && (
        <button
          className="Jua-font border-2 border-blue-900 bg-green-200 h-10 w-16 rounded-lg mb-4"
          onClick={handleSubmit}
        >
          저장하기
        </button>
      )}
    </div>
  );
};

export default AddIngredients;
