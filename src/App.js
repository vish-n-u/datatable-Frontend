import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductTable from "./ProductTable";
import CategoryForm from "./categoryForm";

async function getTableData(setCategoryDatas, setProductDatas) {
  console.log("getTbbleDataCalled");
  const categories = await fetch(
    "http://localhost:4000/categoryMaster/api/v1/categories"
  );

  const products = await fetch(
    "http://localhost:4000/categoryMaster/api/v1/products"
  );

  const productObject = {};
  let categoryDatas = await categories.json();
  const produceDatas = await products.json();

  produceDatas.message.map((obj) => {
    if (productObject[obj.categoryId]) {
      productObject[obj.categoryId].push(obj);
    } else {
      productObject[obj.categoryId] = [obj];
    }
  });
  categoryDatas.message.map((category, index) => {
    category.id = index + 1;
  });
  console.log(categoryDatas.message, productObject);
  categoryDatas.message.map((obj) =>
    Object.keys(obj.valTypes).map((key) => {
      if (obj.valTypes[key] === "image") {
        console.log("keyyyy----", key);
        productObject[obj._id].map((product) => {
          product.data[key] = (
            <img
              className="h-16 w-28 rounded-md"
              src={product.data[key]}
              alt="img.src"
            ></img>
          );
        });
      }
    })
  );

  console.log("//--/", productObject);

  setCategoryDatas(categoryDatas.message);
  setProductDatas(productObject);
}

function App() {
  const [categoryDatas, setCatgeoryDatas] = useState([]);
  const [productDatas, setProductDatas] = useState({});
  const [dataToBeSent, setDataToBeSent] = useState({});
  const [isAddButtonClicked, setIsAddDataButtonClicked] = useState(false);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  useEffect(() => {
    if (!isAddButtonClicked) getTableData(setCatgeoryDatas, setProductDatas);
  }, [isAddButtonClicked]);
  useEffect(() => {
    if (!isDeleteButtonClicked) getTableData(setCatgeoryDatas, setProductDatas);
  }, [isDeleteButtonClicked]);
  useEffect(() => {
    if (!isCategoryFormOpen) getTableData(setCatgeoryDatas, setProductDatas);
  }, [isCategoryFormOpen]);

  const columns = [
    { field: "id", header: "id" },
    { field: "name", header: "Name" },
  ];
  return (
    <div className="flex flex-col justify-center items-center align-middle">
      <h1 className="m-5 text-lg font-semibold flex justify-evenly w-full">
        Master Category
      </h1>
      <button
        onClick={() => {
          setIsCategoryFormOpen(true);
        }}
        className="absolute right-[350px] text-sm font-semibold top-7 px-3 p-2 rounded-lg bg-blue-100 "
      >
        Add
      </button>

      <DataTable
        className="cursor-pointer "
        onClick={(e) => {
          console.log(e.target.textContent);
          let id = parseInt(e.target.textContent);

          if (Number.isInteger(id)) {
            for (let x = 0; x < categoryDatas.length; x++) {
              if (categoryDatas[x].id == id) {
                setDataToBeSent(categoryDatas[x]);
                return;
              }
            }
          } else {
            for (let x = 0; x < categoryDatas.length; x++) {
              if (categoryDatas[x].name == e.target.textContent) {
                setDataToBeSent(categoryDatas[x]);
                return;
              }
            }
          }
        }}
        value={categoryDatas}
        stripedRows
        tableStyle={{ minWidth: "50rem", maxWidth: "300px", color: "blue" }}
      >
        {columns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
          />
        ))}
      </DataTable>
      {categoryDatas.length > 0 && Object.keys(dataToBeSent).length > 0 && (
        <ProductTable
          categoryData={dataToBeSent}
          productDatas={productDatas}
          categoryDatas={categoryDatas}
          isAddButtonClicked={isAddButtonClicked}
          setIsAddDataButtonClicked={setIsAddDataButtonClicked}
          isDeleteButtonClicked={isDeleteButtonClicked}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        />
      )}
      {isCategoryFormOpen && (
        <CategoryForm setIsCategoryFormOpen={setIsCategoryFormOpen} />
      )}
    </div>
  );
}

export default App;
