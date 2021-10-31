import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../configs/url";

const Register = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    photo: "",
  });

  // React 控制 member 資料，需要透過 setMember 修改資料
  // 透過 function 來操作
  function handleChange(e) {
    let newMember = { ...member };
    newMember[e.target.name] = e.target.value;
    setMember(newMember);
  }

  // 表單送出時 將表單傳到資料庫
  async function handleSubmit(e) {
    // 即取消事件的預設行為
    e.preventDefault();
    try {
      let form = await axios.post(`${API_URL}/api/auth/register`, member);
    } catch (err) {
      console.log("handleSubmit", err);
    }
  }

  return (
    <div className="column is-three-fifths">
      <form className="box" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="email"
              value={member.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              value={member.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">確認密碼</label>
          <div className="control">
            <input
              name="confirmPassword"
              className="input"
              type="password"
              value={member.confirmPassword}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">暱稱</label>
          <div className="control">
            <input
              name="name"
              className="input"
              type="text"
              value={member.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="file is-primary is-boxed has-name mb-3">
          <label className="file-label">
            <input
              name="photo"
              className="file-input"
              type="file"
              value={member.photo}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="file-cta">
              <FontAwesomeIcon icon={faUpload} />
              <span className="file-label">選擇檔案</span>
            </span>
            <span className="file-name">TODO: 檔名</span>
          </label>
          <figure className="image is-128x128 ml-5">
            <img src="#" />
          </figure>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">註冊</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
