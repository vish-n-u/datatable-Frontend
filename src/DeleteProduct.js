import { useState, useEffect } from "react";

function DeleteComponent({ setIsDeleteButtonClicked, productId }) {
  const [yesOrCancel, setYesOrCancel] = useState("");
  return (
    <>
      <div className="opacity-50 absolute z-10 bg-black w-full h-screen"></div>
      <div className="w-full h-screen absolute flex items-center align-middle justify-center">
        <div className="bg-white z-50 flex flex-col justify-around shadow-lg shadow-black m-5 p-5 min-h-[30%]">
          <h1 className="font-medium text-lg">
            Are You sure You want to delete this item
          </h1>
          <div className="flex justify-evenly">
            <button
              onClick={() => deleteData(productId, setIsDeleteButtonClicked)}
              className="bg-blue-400 active:bg-blue-600 px-5 py-2 m-4"
            >
              Yes
            </button>
            <button
              onClick={() => setIsDeleteButtonClicked(false)}
              className="bg-blue-400 active:bg-blue-600 px-5 py-2 m-4"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

async function deleteData(productId, setIsDeleteButtonClicked) {
  const response = await fetch(
    "http://localhost:4000/categoryMaster/api/v1/products",
    {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({ productId }),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.status == 500) alert("internal server error");
  setIsDeleteButtonClicked(false);
}

export default DeleteComponent;
