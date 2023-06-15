import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
const NewTable = () => {
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
    { field: "edit", header: "Edit/Delete" },
  ];
  const products = [
    {
      id: 12,
      code: 1000,
      name: "Jasmine",
      category: "INOX",
      quantity: 2,
      edit: (
        <>
          <button className="  p-2 m-2">
            <FontAwesomeIcon icon={faPenToSquare} size={"lg"} />
          </button>
          <button className=" p-2 m-2 ">
            <FontAwesomeIcon icon={faTrash} size={"lg"} />
          </button>
        </>
      ),
    },
    { id: 13, code: 1000, name: "Jasmine", category: "INOX", quantity: 2 },
    { id: 14, code: 1000, name: "Jasmine", category: "INOX", quantity: 2 },
    { id: 15, code: 1000, name: "Jasmine", category: "INOX", quantity: 2 },
  ];
  return (
    <DataTable value={products} stripedRows tableStyle={{ minWidth: "50rem" }}>
      {columns.map((col, i) => (
        <Column key={col.field} field={col.field} header={col.header} />
      ))}
    </DataTable>
  );
};

export default NewTable;
