import {useState} from "react";
import axios from "axios";
import { API_URL } from "../configs/url";

const Login = () => {
  const [member,setMember] = useState({email:'',password:''})
  
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
      let form = await axios.post(`${API_URL}/api/auth/login`, member);
    } catch (err) {
      console.log("handleSubmit", err);
    }
  }

  return (
    <div className="column is-three-fifths">
      <form className="box">
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input name="email" className="input" type="email" value={member.email} onChange={handleChange} />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input name="password" className="input" type="password" value={member.password} onChange={handleChange} />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">登入</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
