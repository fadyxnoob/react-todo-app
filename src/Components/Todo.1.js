import React, { useEffect, useState } from 'react';
import todo from '../Images/todo.jpg';


// get items from localStorage
const getLocalStorageData = () => {
    const list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}
export const Todo = () => {
    const [inputData, setInutData] = useState("");
    const [items, setItems] = useState(getLocalStorageData());
    const [toggleSubmit, settoggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem ] = useState(null);

    const addItems = () => {
        if (!inputData) {
            alert("Please add Item.");
        }else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEditItem){
                        return { ...elem, name: inputData}
                    }
                    return elem;
                })
            )
            settoggleSubmit(true)
            setInutData('');
            setIsEditItem(null);
        } else {
            const allInputData = {id : new Date().getTime().toString(), name : inputData}
            setItems([...items, allInputData]);
            setInutData('');
        }
    };

    const editItem = (id) => {
        const editItem = items.find((elem) =>{
            return elem.id === id;
        }) 
        settoggleSubmit(false)
        setInutData(editItem.name);
        setIsEditItem(id);
        
    }
    const removeItem = (index) => {
        const updateItems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updateItems);
    }

    const removeAll = () => {
        setItems([])
    }


    // add data to local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])
    return (
        <>
            <div className='container-fluid bg-dark'>
                <div className='container '>
                    <h2 className="text-light fs-1">Your daily Todo</h2>
                    <div className='row w-50 border p-3 rounded rowBG '>
                        <div className='col-8 text-center'>
                            <figure>
                                <img src={todo} alt="todo logo" />
                                <figcaption className='mt-2 fs-5 border bg-dark text-light p-1 rounded'> Add a new Todo 😎</figcaption>
                            </figure>
                        </div>
                        <div className='col-8 mb-3'>
                            <div className="input-group flex-nowrap  bg-dark rounded  text-light">
                                <input type="text" className="form-control  bg-dark inputField text-light fs-5" placeholder='✍ add todo...' aria-label="Username" aria-describedby="addon-wrapping"
                                    value={inputData}
                                    onChange={(e) => setInutData(e.target.value)} />
                                <span className="input-group-text addTodo bg-dark  text-light" id="addon-wrapping">
                                    {
                                        toggleSubmit ? <i className="text-info fa-solid fa-plus" title='add item' onClick={addItems}></i> :<i className="text-success fa-solid fa-pen-to-square me-2 fs-5" title='update item' onClick={addItems}></i>
                                    } </span>
                            </div>
                        </div>
                        <div className='col-8'>
                            {items.map((item) => {
                                return (
                                    <div className="mb-2 d-flex justify-content-between p-1 bg-dark rounded  text-light" key={item.id}>
                                        <h5 className='ps-2 pt-1'>{item.name}</h5>
                                        <span className="input-group-text addTodo bg-dark" id="addon-wrapping">
                                            <i className="text-success fa-solid fa-pen-to-square me-2 fs-5" title='edit item' onClick={() => editItem(item.id)}></i>
                                            <i className="text-danger fa-solid fa-delete-left fs-5" title='delete item' onClick={() => removeItem(item.id)}></i>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='col-8 text-center '>
                            {items.length !== 0 && (
                                <button className='btn btn-dark' onClick={removeAll}><span>Remove All</span></button>
                            )}
                        </div>

                    </div>
                    <div className='row mt-2'>
                        <div className='col text-center text-warning'>
                            <h5>insta && tiktok @byt3blitz</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Todo