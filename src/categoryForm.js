import { useState } from "react";

const CategoryForm = ({ setIsCategoryFormOpen }) => {
  const [name, setName] = useState("");
  const [column, setColumn] = useState([""]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [valType, setValType] = useState([]);
  const [hasInputValBeenInFocus, setHasInputValBeenInFocus] = useState([]);
  const [showNameErrMessage, setShowNameErrMessage] = useState(false);
  console.log("-----column", column, valType);
  const handleMouseEnter = (event) => {
    console.log(column, valType);
    column.map((col) => {
      if (!col) {
        setShowMessage(true);
        setPosition({ x: event.clientX, y: event.clientY });
      }
    });
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };
  return (
    <>
      <div className="h-full w-full relative  flex z-50 justify-start  align-top items-start ">
        <div className="bg-white top-20 left-[33%] fixed overflow-scroll border-2  z-50  flex flex-col lg:w-[30%] w-[55%] justify-center align-middle items-center  shadow-2xl shadow-black">
          <h1
            onClick={() => setIsCategoryFormOpen(false)}
            className="left-44 top-0 px-4 py-2 m-2 text-xl bg-gray-100 hover:bg-gray-300 rounded-full active:bg-gray-500 relative font-semibold"
          >
            X
          </h1>
          <h1 className="my-8 text-lg  font-semibold">Category-Form</h1>
          <input
            className={`bg-blue-50 border rounded-md p-2 ${
              showNameErrMessage ? "border-red-500" : ""
            }`}
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <h1>Category-Name</h1>
          {showNameErrMessage && (
            <h1 className="text-red-500">Name cant be Empty!</h1>
          )}

          <div className="mt-10 mb-5 w-full flex justify-around ">
            <h1>{column.length < 5 ? "Add columns" : "Columns"}</h1>
            {column.length < 5 && (
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (!showMessage) {
                    let newArr = [...column];
                    newArr.push("");
                    setColumn(newArr);
                  }
                }}
                className={`text-xl flex align-middle pb-1 active:bg-blue-500 items-center font-bold px-2 bg-blue-200 rounded-full ${
                  showMessage ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                +
              </button>
            )}
          </div>

          {showMessage && (
            <p
              className="p-2 bg-orange-300"
              style={{
                position: "fixed",
                top: position.y,
                left: position.x,
              }}
            >
              Seems like you've an unfilled column,
            </p>
          )}
          <div className="max-h-[200px]  w-72 overflow-y-scroll">
            {column.map((val, i) => {
              return (
                <div key={i} className="flex  my-2">
                  <div className="flex flex-col">
                    <input
                      onFocus={() => {
                        let newArr = [...hasInputValBeenInFocus];
                        newArr[i] = true;
                        setHasInputValBeenInFocus(newArr);
                      }}
                      placeholder="name...."
                      className={`border-2  px-2 ${
                        hasInputValBeenInFocus[i] && column[i].length === 0
                          ? "border-red-600"
                          : "border-black"
                      }`}
                      onChange={(e) => {
                        let str = e.target.value;
                        column[i] = str;
                        console.log("column[i]", column[i], str, column);
                        setColumn([...column]);
                        //   setName(column);
                      }}
                      type="text"
                    ></input>
                    {hasInputValBeenInFocus[i] && column[i].length == 0 && (
                      <h1 className="text-red-600 inline-block">
                        column cant be empty
                      </h1>
                    )}
                    <div className="flex flex-col">
                      <h1 className="mb-3"> Select the Input Type:-</h1>
                      <form className="flex justify-start items-start">
                        <div
                          className="flex flex-col justify-start items-start
                        mx-5"
                        >
                          <input
                            onClick={() => {
                              let newArr = [...valType];
                              newArr[i] = "number";
                              setValType(newArr);
                            }}
                            type="radio"
                            id="number"
                            name="inputType"
                          />
                          <label htmlFor="number">Number</label>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <input
                            onClick={() => {
                              let newArr = [...valType];
                              newArr[i] = "image";
                              setValType(newArr);
                            }}
                            type="radio"
                            id="image"
                            name="inputType"
                          />
                          <label htmlFor="image">Image</label>
                        </div>
                      </form>
                    </div>
                  </div>
                  {i > 0 && (
                    <button
                      onClick={() => {
                        let newArr = [];
                        column.map((col, index) => {
                          if (i != index) newArr.push(col);
                        });
                        setColumn(newArr);
                      }}
                      className=" flex items-center relative left-10 text-2xl mb-1 font-bold h-5 w-fit "
                    >
                      -
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={async () => {
              if (name == "") {
                setShowNameErrMessage(true);
                return;
              }
              let valObj = {};
              column.map((col, i) => {
                valObj[col] = valType[i] || "text";
              });
              const data = await fetch(
                "http://localhost:4000/categoryMaster/api/v1/categories",
                {
                  method: "POST",
                  mode: "cors",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    name,
                    vals: column,
                    valType: valObj,
                  }),
                }
              );
              console.log(data.status);
              setIsCategoryFormOpen(false);
            }}
            className={`px-3 my-7 p-2 bg-blue-200 rounded-lg active:bg-blue-500 
               ${showNameErrMessage ? "cursor-not-allowed" : ""}
              ${
                showNameErrMessage ||
                column.map((col) => {
                  if (col == "") return "cursor-not-allowed";
                })
              }`}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="h-screen   absolute top-0 w-full flex bg-black bg-opacity-50 z-20 justify-center content-center align-middle items-center "></div>
    </>
  );
};

export default CategoryForm;
