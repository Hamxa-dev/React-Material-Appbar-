import React, { useRef, useState, useEffect } from "react";
import { db } from "../../config/FirebaseConfig/FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"; // Added 'setDoc'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Typography } from "@mui/material";

const Home = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "todo"));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.unshift({ id: doc.id, todo: doc.data().todo });
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
        // Edit  todo
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
        const docRef = await addDoc(collection(db, "todo"), {
          todo: newTodo,
        });
        console.log("Document written with ID: ", docRef.id);
        setData((prevData) => [{ id: docRef.id, todo: newTodo }, ...prevData]);
      }

      ref.current.value = "";
    } catch (e) {
      console.error("Error adding/updating document: ", e);
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
      await deleteDoc(doc(db, "todo", id));
      setData((prevData) => prevData.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const updateTodoInFirestore = async (id, newTodo) => {
    try {
      await setDoc(doc(db, "todo", id), { todo: newTodo }, { merge: true });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(text);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "90px",
      }}
    >
      <form
        onSubmit={RenderTodo}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" style={{ marginBottom: "30px" }}>
          TODo APP
        </Typography>
        <TextField
          inputRef={ref}
          label="Todo text box "
          variant="filled"
          placeholder="Enter todo"
          required
          style={{
            width: "320px",
            border: "2px solid #284cff ",
            borderRadius: "9px",
            backgroundColor: "ButtonHighlight",
            marginBottom: "10px",
          }}
        />
        <Button
          type="submit"
          style={{ paddingLeft: "120px", paddingRight: "120px" }}
          variant="contained"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : editingIndex !== null ? (
            "Edit Todo"
          ) : (
            "Add Todo"
          )}
        </Button>
      </form>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        {data.map((el, ind) => (
          <li
            key={el.id}
            style={{
              marginTop: "10px",
              paddingTop: "5%",
              border: "2px solid #284cff",
              padding: "10px",
              borderRadius: "9px",
              display: "flex",
              justifyContent: "space-between",
              textOverflow: "ellipsis",
              overflow: "auto",
              width: "320px",
              height: "70px",
            }}
          >
            <span>{el.todo}</span>
            <div
              style={{
                display: "flex",
                marginBottom: "5px",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Button
                variant="text"
                style={{ color: "greenyellow" }}
                size="small"
                onClick={() => editTodo(ind)}
              >
                Edit
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => deleteTodo(el.id)}
                style={{ marginLeft: "5px", color: "red" }}
              >
                Delete
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => copyToClipboard(el.todo)}
                style={{ marginLeft: "5px" }}
              >
                <FileCopyIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
