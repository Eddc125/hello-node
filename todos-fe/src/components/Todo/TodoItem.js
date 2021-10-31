import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import { useState, useEffect } from "react";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../../configs/status";
import { useParams } from "react-router-dom";
import { API_URL } from "../../configs/url";

const TodoList = () => {
  const { todoId } = useParams();
  const [todoItem, setTodoItem] = useState(null);
  const [creator, setCreator] = useState(null);
  const [updator, setUpdator] = useState(null);

  useEffect(async () => {
    let response_TodoId = await axios.get(`${API_URL}/api/todos/${todoId}`);
    let response_Created = await axios.get(
      `http://localhost:3001/api/members/${response_TodoId.data.creator_id}`
    );
    let response_Updated = await axios.get(
      `http://localhost:3001/api/members/${response_TodoId.data.updator_id}`
    );
    setTodoItem(response_TodoId.data);
    setCreator(response_Created.data.name);
    setUpdator(response_Updated.data.name);
  }, []);

  if (todoItem == null && creator == null && updator == null) {
    return <>載入中...</>;
  }

  return (
    <>
      <div className="column is-three-fifths">
        <article
          className={`panel ${STATUS_COLOR && STATUS_COLOR[todoItem.status]}`}
          key={todoItem.id}
        >
          <p className="panel-heading">
            {" "}
            {STATUS_WORD[todoItem.status]} {todoItem.title}
          </p>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="#" alt="Placeholder image" />
            </figure>
          </div>
          <div className="panel-block">{todoItem.content}</div>
          <ul>
            <li className="panel-block">
              到期日： {todoItem.deadline.slice(0, 10)}
            </li>
            <li className="panel-block">
              {" "}
              {creator} 於 {todoItem.created_at.slice(0, 10)} 建立
            </li>
            <li className="panel-block">
              {updator} 於 {todoItem.updated_at.slice(0, 10)} 更新
            </li>
          </ul>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </article>
      </div>
      <div className="column is-two-fifths">
        <article className="panel is-link">
          <p className="panel-heading">共享</p>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder="輸入帳號" />
            </div>
            <div className="control">
              <a className="button is-info">新增</a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default TodoList;
