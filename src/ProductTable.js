import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteComponent from "./DeleteProduct";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ProductTable = ({
  categoryData,
  productDatas,
  categoryDatas,
  isAddButtonClicked,
  setIsAddDataButtonClicked,
  isDeleteButtonClicked,
  setIsDeleteButtonClicked,
}) => {
  const [editOrCreate, setEditOrCreate] = useState("");
  const [productId, setProductId] = useState("");

  const id = categoryData._id;
  const newData = [...categoryData.vals];
  newData.push("edit/delete");
  newData.unshift("id");
  let data = [];
  if (productDatas[id]) {
    productDatas[id].map((val, i) => {
      let x = "edit/delete";
      val.data.id = i + 1;
      val.data[x] = (
        <>
          <button
            onClick={(e) => {
              // console.log("onClick----", val);
              setIsAddDataButtonClicked(true);
              setEditOrCreate("edit");
              setProductId(val._id);
            }}
            className="  p-2 m-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} size={"lg"} />
          </button>
          <button
            onClick={(e) => {
              setIsDeleteButtonClicked(true);
              setProductId(val._id);
            }}
            className=" p-2 m-2 "
          >
            <FontAwesomeIcon icon={faTrash} size={"lg"} />
          </button>
        </>
      );

      data.push(val.data);
    });
  }

  return (
    <>
      {isAddButtonClicked && (
        <Form
          categoryIdAsPropsForForm={id}
          categoryData={categoryData}
          setIsAddDataButtonClicked={setIsAddDataButtonClicked}
          editOrCreate={editOrCreate}
          productId={productId}
          productData={productDatas}
        />
      )}
      {isDeleteButtonClicked && (
        <DeleteComponent
          productId={productId}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        ></DeleteComponent>
      )}
      <div className="flex mt-16 m-3 w-full justify-center items-center">
        <div className="flex justify-between w-1/2">
          <h1 className="relative bottom-0 top-8">
            Total Product qty:- {productDatas?.[id]?.length || 0}
          </h1>
          <h1 className="font-semibold text-xl mx-5 relative right-8">
            {categoryData.name}
          </h1>
          <button
            onClick={() => {
              setIsAddDataButtonClicked(true);
              setEditOrCreate("create");
            }}
            className="font-semibold z-50 p-2 px-3 relative bottom-0 top-5 text-sm bg-blue-200 rounded-lg active:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>

      <DataTable
        className="mt-3 z-0"
        value={data}
        paginator
        rows={3}
        showGridlines
        rowsPerPageOptions={[3, 6, 15, 30]}
        tableStyle={{ minWidth: "50rem", maxWidth: "300px" }}
      >
        {newData.map((val) => {
          return <Column key={val} field={val} header={val} />;
        })}
      </DataTable>
    </>
  );
};
export default ProductTable;
