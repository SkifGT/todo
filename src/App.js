import React from 'react'
import { DeleteTwoTone, CloseSquareTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { List, 
  Typography, 
  Divider, 
} from 'antd';
import axios from 'axios';
import Demo from './components/Demo';

function App() {
  const [todoList, setTodoList] = React.useState([])


  React.useEffect(() => {
        axios.get('https://62615c64327d3896e27a830c.mockapi.io/listTodo').then((function (response){setTodoList(response.data)}))

  },[])

const handleClickTask = async ({id, text, is_complete}) => {
  await axios.put(`https://62615c64327d3896e27a830c.mockapi.io/listTodo/${id}`,{
    "id": id,
    "text": text,
    "is_complete": !is_complete
  })
  await axios.get('https://62615c64327d3896e27a830c.mockapi.io/listTodo').then((function (response){setTodoList(response.data)}))
}

const handleDeleteTask = async (obj) => {
  try {
    console.log(obj.id);
    await axios.delete(`https://62615c64327d3896e27a830c.mockapi.io/listTodo/${obj.id}`);
    setTodoList((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
  } catch (error) {
    alert('Ошибка при удалении задачи из списка');
    console.error(error);
  }
}

const handleAddTask = async (text) => {
  console.log(text.text);
    await axios.post(`https://62615c64327d3896e27a830c.mockapi.io/listTodo/`, {
      "text": text.text,
      "is_complete": false
    })
    await axios.get('https://62615c64327d3896e27a830c.mockapi.io/listTodo').then((function (response){setTodoList(response.data)}))
  }


return (
    <div>
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
  </div>
  );
}

export default App;
