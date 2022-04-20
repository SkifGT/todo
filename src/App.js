
import { DeleteTwoTone, CloseSquareTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { List, Typography, Divider, Input, Button, } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

function App() {
  return (
    <div>

<>
    <Divider orientation="left"><h2>TODO list</h2></Divider>
    <List
      header={<div><h3>Количество активных задач {data.length} </h3></div>}
      footer={<div>Добавьте новую задачу</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Typography.Text mark>
            < CloseSquareTwoTone />
            < DeleteTwoTone />
            <CheckCircleTwoTone twoToneColor="#eb2f96"/> 
          </Typography.Text> {item} 
        </List.Item>
      )}
    />
        <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="Новая задача" />
      <Button type="primary">Submit</Button>
    </Input.Group>
  </></div>
  );
}

export default App;
