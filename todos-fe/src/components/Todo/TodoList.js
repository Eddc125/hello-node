import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import { useState, useEffect } from "react";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../../configs/status";

const TodoList = () => {
  const [todos, setTodos] = useState(null);

  useEffect(async () => {
    let response = await axios.get("http://localhost:3001/api/todos/");
    setTodos(response.data);
  }, []);

  // 如果 todos 資料尚未抓回來 會停留在 載入中的畫面
  if(todos == null){
    return(<>載入中...</>)
  }

  return (
    <div className="column is-three-fifths">
      <nav
        className="pagination is-success"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list"></ul>
      </nav>
      <div className="level">
        <div className="level-item">
          <div className="buttons">
            <button className="button is-info">進行中</button>
            <button className="button is-success">已完成</button>
            <button className="button is-danger">已暫停</button>
          </div>
        </div>
      </div>
      <h2>TODO: 列表</h2>
      {todos.map((item) => {
        return (
          <section
            className={`message ${STATUS_COLOR && STATUS_COLOR[item.status]}`}
            key={item.id}
          >
            <header className="message-header">
              <p>
                {STATUS_WORD && STATUS_WORD[item.status]} {item.title}
              </p>
            </header>
            <div className="message-body">
              {item.content}

              <div>到期日：{item.deadline.slice(0,10)}</div>
            </div>
            <footer className="card-footer">
              <ShowBtn />
              <a href="/" className="card-footer-item">
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Done
              </a>
              <EditBtn />
              <DeleteBtn />
            </footer>
          </section>
        );
      })}
    </div>
  );
};

export default TodoList;
