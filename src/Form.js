import React, { useEffect, useState } from "react";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
async function onUpload(e) {
  console.log("e.target.files[0]::----", e.target);
  if (e.target.files[0]) {
    console.log("reached");
    const base64 = await toBase64(e.target.files[0]);
    console.log("base64::", base64);
    return base64;
  }
}
const Form = ({
  categoryIdAsPropsForForm,
  categoryData,
  setIsAddDataButtonClicked,
  editOrCreate,
  productId,
  productData,
}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log("categoryData:----", categoryData);
  let format = {};
  useEffect(() => {
    categoryData.vals.map((val) => {
      if (editOrCreate == "create") {
        format[val] = "";
      } else {
        // if (!productData._id)
        productData[categoryIdAsPropsForForm].map((product) => {
          // console.log("----product._id", product._id, productId);
          if (product._id == productId) {
            Object.keys(product.data).map((key) => {
              // console.log("reached here");
              format[key] = product.data[key];
            });
          }
        });
      }
    });

    setData(format);
  }, []);

  // console.log("-----", categoryIdAsPropsForForm, categoryData, data);

  return (
    <>
      <div className="h-full w-full flex z-50 justify-center  align-middle items-center ">
        <div className="bg-white border-2 absolute flex flex-col w-[30%]  justify-center   shadow-2xl shadow-black">
          <h1
            onClick={() => setIsAddDataButtonClicked(false)}
            className="absolute top-3 right-1 cursor-pointer"
          >
            ⚔️
          </h1>
          <button className="flex justify-center align-middle w-[100%]">
            {categoryData.name}
          </button>
          <form className="flex flex-col align-middle">
            {categoryData.vals.map((val) => {
              // console.log("@@@", val, val.match(/TotalCount:-/i));
              if ("create" || productData[categoryIdAsPropsForForm])
                return (
                  <div
                    className="flex flex-col p-3 m-2 align-middle items-center"
                    key={val}
                  >
                    <h1>{val}</h1>
                    <input
                      value={
                        categoryData.valTypes[val] !== "image" ? data[val] : ""
                      }
                      type={
                        categoryData.valTypes[val] !== "image"
                          ? categoryData.valTypes[val]
                          : "file"
                      }
                      onChange={async (e) => {
                        if (categoryData.valTypes[val] === "image") {
                          let newData = await onUpload(e);
                          let obj = { ...data, [val]: newData };
                          setData(obj);
                        } else {
                          let obj = { ...data, [val]: e.target.value };
                          setData(obj);
                        } // console.log("string:==", string, obj, val);
                      }}
                      className="bg-blue-50 p-2"
                    />
                  </div>
                );
            })}
            <div className="flex justify-center m-2">
              <h1
                onClick={() =>
                  addData(
                    categoryIdAsPropsForForm,
                    data,
                    setIsAddDataButtonClicked,
                    setLoading,
                    editOrCreate,
                    productId
                  )
                }
                className={`p-2 flex justify-center align-middle items-center bg-blue-200 w-[40%] active:bg-blue-500 ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "loading" : "Submit"}
              </h1>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-50 fixed bg-black w-full min-h-screen z-20 h-[1200px] "></div>
    </>
  );
};

async function addData(
  categoryIdAsPropsForForm,
  data,
  setIsAddDataButtonClicked,
  setLoading,
  editOrCreate,
  productId
) {
  console.log(
    "categoryIdAsPropsForForm----",
    categoryIdAsPropsForForm,
    "data-----",
    data,
    "setIsAddDataButtonClicked-----",
    setLoading,
    "editOrCreate-----",
    editOrCreate,
    "productId:",
    productId
  );

  let newData = { ...data };
  let str = "edit/delete";
  console.log("newData----", newData);
  delete newData[str];

  console.log("newData----", newData);
  const body =
    editOrCreate == "create"
      ? { categoryId: categoryIdAsPropsForForm, data: newData }
      : {
          productId,
          updateObj: newData,
        };
  console.log("body:===", body);
  const response = await fetch(
    "http://localhost:4000/categoryMaster/api/v1/products",
    {
      method: editOrCreate == "create" ? "POST" : "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: "cors",
    }
  );
  setLoading(false);
  if (response.status == 201 || response.status == 200) {
    setIsAddDataButtonClicked(false);
  } else {
    alert("Internal server err");
    return;
  }
}

export default Form;
