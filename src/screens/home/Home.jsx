import React, { useRef, useState, useEffect } from 'react';
import { db } from '../../config/FirebaseConfig/FirebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'todo'));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, todo: doc.data().todo });
      });
      setData(todos);
    };

    fetchData();
  }, []);

  const RenderTodo = async (event) => {
    event.preventDefault();
    const newTodo = ref.current.value;

    try {
      setLoading(true);

      if (editingIndex !== null) {
        // Edit existing todo
        const todoId = data[editingIndex].id;
        await updateTodoInFirestore(todoId, newTodo);
        setData((prevData) => {
          const newData = [...prevData];
          newData[editingIndex].todo = newTodo;
          return newData;
        });
        setEditingIndex(null);
      } else {
        // Add new todo
        const docRef = await addDoc(collection(db, 'todo'), {
          todo: newTodo,
        });
        console.log('Document written with ID: ', docRef.id);
        setData((prevData) => [...prevData, { id: docRef.id, todo: newTodo }]);
      }

      ref.current.value = '';
    } catch (e) {
      console.error('Error adding/updating document: ', e);
    } finally {
      setLoading(false);
    }
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    ref.current.value = data[index].todo;
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todo', id));
      setData((prevData) => prevData.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const updateTodoInFirestore = async (id, newTodo) => {
    try {
      await setDoc(doc(db, 'todo', id), { todo: newTodo }, { merge: true });
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '90px' }}>
      <form onSubmit={RenderTodo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          inputRef={ref}
          label="Todo"
          variant="filled"
          placeholder="Enter todo"
          required
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : editingIndex !== null ? 'Edit Todo' : 'Add Todo'}
        </Button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px', textAlign: 'center' }}>
        {data.map((el, ind) => (
          <li
            key={el.id}
            style={{ marginBottom: '5px', gap:'90px', border: '1px solid #ccc', padding: '10px', borderRadius: '9px', display: 'flex', justifyContent: 'space-between' }}
          >
            <span>{el.todo}</span>
            <div>
              <Button variant="text" size="small" onClick={() => editTodo(ind)}>
                Edit
              </Button>
              <Button variant="text" size="small" onClick={() => deleteTodo(el.id)} style={{ marginLeft: '5px' }}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
