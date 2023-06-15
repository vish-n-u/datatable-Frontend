import React, { useState } from "react";

//  const obj = {
//     name:"",
//     data:[[x,num]]
// }

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="bg-blue-100">
          <h1>Category</h1>
          <input
            type="text"
            placeholder="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-screen h-screen bg-black opacity-50 fixed"></div>
    </>
  );
};

export default CategoryForm;
