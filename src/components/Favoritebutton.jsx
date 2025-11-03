import { useState } from "react";
export function Favoritebutton() {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button
      className="hover:scale-110 transition-transform duration-200
    text-white text-xl cursor-pointer"
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? "❤" : "🤍"}
    </button>
  );
}
