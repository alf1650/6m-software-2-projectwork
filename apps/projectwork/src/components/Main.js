import '../App.css';
// App.js
import { useEffect, useState } from 'react';
import userApi from '../api/userApi';
import Table from '../components/Table';
import AddForm from '../components/Registration';
import TableUser from '../components/TableUser';
import TableUserFav from '../components/TableUserFav';
import AddFav from '../components/AddFav';
import Registration from '../components/Registration';
import { useNavigate} from 'react-router-dom';

function Main() {

  const [users, setUsers] = useState([]);
  const [usersFav, setUsersFav] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  
  const apiGet = async () => {
    try {
      const response = await userApi.get(`/users/`);
      console.log("response.data", response.data);
      setUsers(response.data);
       } catch (error) {
      console.log(error.message);
    }
  }


  const apiGetId = async () => {
    try {
      const response = await userApi(`/users/${userId}/favorite`);
        console.log(response.data);  
        setUsersFav(response.data);  
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const apiPost = async (newUser) => {
    try {
      const response = await userApi.post(`/users`, newUser)
      console.log(response.data);
      apiGet();
    } catch(error) {
      console.log(error.message);
    };
  }

  const apiPostFav = async (newFav) => {
    try {
      const response = await userApi.post(`/users/${userId}/favorite`, newFav)
      console.log(response.data);
      apiGet();
    } catch(error) {
      console.log(error.message);
    };
  }



  useEffect(() => {
    apiGet();
    const setNewUserInfo = JSON.parse(localStorage.getItem('user-info'));
   

    if (setNewUserInfo !== null) {
        // setLoggedIn(true);
        navigate("/Main")
        const setNewUserId = setNewUserInfo.map(item => item.userId);
        // console.log(setNewUserId);
        setUserId(setNewUserId);
      } else {
        // setLoggedIn(false);
        navigate("/")
      }

  }, []);

  const handlerLogout = (e) => {
    e.preventDefault();
    setUserId("");
    setUsers([]);
    setUsersFav([]);
    localStorage.removeItem('user-info');
    navigate("/");
  }

  return (
    

    <div className="App">
      <h1>Holiday Data</h1>
      {/* <button onClick={apiGet}>Load Holiday Data</button> */}
      {/* <Table list={holidayData} /> */}
      <button onClick= {handlerLogout}>Log out</button>
      <Registration handlerAddUser={apiPost} list={users} />
      <button onClick= {apiGet}>Load Users</button>
      <TableUser list={users} />
      <br></br>
      <button onClick= {apiGetId}>Load Users fav</button>
      <TableUserFav list={usersFav} />

      <AddFav handlerAddFav={apiPostFav} />

    </div>
  );
}
export default Main;