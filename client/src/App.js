import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {

   const[itemtext,setitemtext]=useState("");
   const [listitems,setlistitems]=useState([]);
   const [isUpdating, setIsUpdating] = useState('');
   const [updateItemText, setUpdateItemText] = useState('');

   // adding items to the database   
   const additem=async(e)=>{
    e.preventDefault();
    try{
       const res=await axios.post('http://localhost:5500/api/item',{item:itemtext});
       setlistitems(prev => [...prev, res.data]);
       setitemtext('')
    }
    catch(err){
      console.log(err);
    }
   }
  
   //get items from database
   useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:5500/api/items')
        setlistitems(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);

    // Delete item when click on delete
    const deleteItem = async (id) => {
      try{
        const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
        const newListItems = listitems.filter(item=> item._id !== id);
        setlistitems(newListItems);
      }catch(err){
        console.log(err);
      }
    }

      //Update item
  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listitems.findIndex(item => item._id === isUpdating);
      const updatedItem = listitems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form className="form" onSubmit={e=>additem(e)}>
        <input type="text" placeholder="Add Item.." onChange={e => {setitemtext(e.target.value)} } value={itemtext}/>
        <button type="submit">Add</button>
      </form>

      <div className="items">
      {
          listitems.map(item => (
          <div className="item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                </>
            }
          </div>
          ))
        }
       
      </div>

    </div>
  );
}

export default App;
