import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {db} from './config/config'
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const [todo, setTodo] = useState([]);
  let [inputValue, setInputValue] = useState("");
  let [refresh, setRefresh] = useState(false)

  useEffect(async()=>{
    const dbRef = collection(db,"todos")
    const getData = await getDocs(dbRef)
    let getTodo = []
    getData.forEach((doc)=>{
      getTodo.push({
        key: doc.id,
        todo: doc.data().todo
      })
    })
    setTodo(getTodo)
  },[refresh])
  const addtodo = async () => {
    const dbRef = collection(db,"todos")
    try{
      const addData = await addDoc(dbRef,{
        todo: inputValue
      })
    } catch(e){
      
    }
    setInputValue("")
  };
  const removeTodo = async (index) => {
    const dbRef = doc(db,"todos",index)
    await deleteDoc(dbRef)
    setRefresh(!refresh)
  }
  const deleteTodo = () => {
    todo.forEach(async(docs)=>{
      await deleteDoc(doc(db,"todos",docs.key))
    })
  }
  const editTodo = async (key) => {
    // setIndexValue(ind);
    const editValue = prompt("enter value");
    const dbRef = doc(db, "todos", key);
    await updateDoc(dbRef, {
      todo: editValue,
    });
    setRefresh(!refresh);
  }
  return (
    <div>
      <h1 className="text-center mt-5">TODO LIST</h1>
      <div className="w-50 mx-auto">
        <input type="text" placeholder="ENTER TODO..." value={inputValue} className="my-5 form-control input-group" onChange={(e) => setInputValue(e.target.value)} />
        <button className="btn btn-info mx-2" onClick={addtodo}>ADD TODO</button>
        <button className="btn btn-danger" onClick={deleteTodo}>DELETE TODO</button>
      </div>
      <section className="container my-5">
        {todo.map((value, index) => {
          return (
            <div key={index} className="mt-3">
              <li className="w-50 d-inline-block mx-3"> {value.todo} </li>
              <span onClick={() => removeTodo(value.key)} className="btn btn-danger">Delete
              </span>
              <span onClick={() => editTodo(value.key)} className="btn btn-info mx-3">
                Edit
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
