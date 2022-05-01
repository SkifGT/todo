import React from 'react'
import { DeleteTwoTone, CloseSquareTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { List, Typography,  Divider, } from 'antd';
import axios from 'axios';
import Demo from './components/Demo';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [todoList, setTodoList] = React.useState([])

  React.useEffect(() => {
        axios.get(BASE_URL).then((function (response){setTodoList(response.data)}))
  },[])

const handleClickTask = async ({id, text, is_complete}) => {
  await axios.put(`${BASE_URL}/${id}`,{
    "id": id,
    "text": text,
    "is_complete": !is_complete
  })
  const response = await axios.get(BASE_URL)
  setTodoList(response.data)
}

const handleDeleteTask = async (obj) => {
  try {
    await axios.delete(`${BASE_URL}/${obj.id}`);
    setTodoList((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
  } catch (error) {
    alert('Ошибка при удалении задачи из списка');
    console.error(error);
  }
}

const handleAddTask = async (text) => {
  await axios.post(BASE_URL, {
    "text": text.text,
    "is_complete": false
  })
  const response = await axios.get(BASE_URL)
  setTodoList(response.data)
  }


return (
  <>
    <Divider orientation="left"><h2>Список задач</h2></Divider>
    <List
      header={<div><h3>Количество задач {todoList.length} </h3></div>}
      footer={<div>Добавьте новую задачу</div>}
      bordered
      dataSource={todoList}
      renderItem={item => (
        <List.Item>
          <Typography.Text  onClick={()=>handleClickTask(item)} className="cu-p">
          {item.is_complete 
            ? <CheckCircleTwoTone twoToneColor="#eb2f96" style={{fontSize: '18px', color: '#ffffff'}}/> 
            : <CloseSquareTwoTone style={{fontSize: '18px'}}/>
          }
          </Typography.Text> 
          <DeleteTwoTone 
          onClick={()=>handleDeleteTask(item)} 
          className="cu-p"
          style={{fontSize: '18px'}}
          /> {item.text} 
        </List.Item>
      )}
    />
    <Demo addTask={handleAddTask} />
  </>
  );
}

export default App;
