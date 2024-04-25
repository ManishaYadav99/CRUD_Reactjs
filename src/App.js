import React, { useEffect, useState } from "react";
import EmployeeData from "./EmployeeData";

const App = () => {
  const [data, setData] = useState([]);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [age, setage] = useState("");
  const [id, setid] = useState(0);
  const [isupdate, setisUpdate] = useState(false);

  useEffect(function () {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    setisUpdate(true);
    if (dt !== undefined) {
      setid(id);
      setfName(dt[0].fName);
      setlName(dt[0].lName);
      setage(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete the item")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e) => {

    let error="";
    if(fName==="")
      error +="first Name requires"
    
    if(lName==="")
      error +="Last Name required"
    
    if(age<0)
      error+="age required"
    
    if(error ===""){
      e.preventDefault();
      const dt = [...data];
      const newObj = {
        id: EmployeeData.length + 1,
        fName: fName,
        lName: lName,
        age: age,
    }
    dt.push(newObj);
    setData(dt);
    
    }
    else{
      alert(error)
    }

   
};
  const handleClear = () => {
    setid(0);
    setfName("");
    setlName("");
    setage("");
    setisUpdate(false);
  };

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].fName = fName;
    dt[index].lName = lName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };

  return (
    <>
      <div className="bg-slate-400 h-screen flex flex-col items-center justify-center mb-2">
        <div className="flex mt-20 h-full gap-4">
          <div className="mr-4">
            <label className="text-white mr-2">First Name:</label>
            <input
              className="px-2 py-1 rounded-md"
              type="text"
              onChange={(e) => setfName(e.target.value)}
              value={fName}
            />
          </div>
          <div className="mr-4">
            <label className="text-white mr-2">Last Name:</label>
            <input
              className="px-2 py-1 rounded-md"
              type="text"
              onChange={(e) => setlName(e.target.value)}
              value={lName}
            />
          </div>
          <div>
            <label className="text-white mr-2">Age:</label>
            <input
              className="px-2 py-1 rounded-md"
              type="text"
              onChange={(e) => setage(e.target.value)}
              value={age}
            />
          </div>
          <div className="mr-4 space-x-3">
            {!isupdate ? (
              <button
                onClick={(e) => handleSave(e)}
                className="rounded-xl bg-green-400 py-1 px-3 text-white hover:bg-green-500 focus:outline-none"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleUpdate()}
                className="rounded-xl bg-green-400 py-1 px-3 text-white hover:bg-green-500 focus:outline-none"
              >
                Update
              </button>
            )}

            <button
              onClick={() => handleClear()}
              className="rounded-xl bg-green-500 py-1 px-3 text-white hover:bg-green-900 focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>

        <table className="border border-collapse w-3/4  font-semibold text-xl text-center bg-emerald-200 rounded-md mb-20 items-center justify-center  ">
          <thead>
            <tr>
              <th className="border border-slate-900 px-4 py-2">Sr.No</th>
              <th className="border border-slate-900 px-4 py-2">ID</th>
              <th className="border border-slate-900 px-4 py-2">fName</th>
              <th className="border border-slate-900 px-4 py-2">lName</th>
              <th className="border border-slate-900 px-4 py-2">Age</th>
              <th className="border border-slate-900 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-slate-400 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-slate-400 px-4 py-2">{item.id}</td>
                <td className="border border-slate-400 px-4 py-2">
                  {item.fName}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {item.lName}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {item.age}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="rounded-xl bg-green-400 py-1 px-3 text-white hover:bg-green-500 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-xl bg-red-500 py-1 px-3 text-white hover:bg-red-600 focus:outline-none ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
