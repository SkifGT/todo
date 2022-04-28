import React from 'react';
import { Form, Input, message, Button, Space } from 'antd';

const Demo = (
      {addTask}
      ) => {
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    message.success('Задача добавлена!');
    form.resetFields();
    await addTask(value);
    
  };

  const onFinishFailed = () => {
    message.error('Ошибка добавления задачи!');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
    <Form.Item
        name="text"
        label=""
        rules={[
        {
            required: true,
        },
        {
            type: 'string',
            warningOnly: true,
        },
        {
            type: 'string',
            min: 6,
        },
        ]}
    >
        <Input placeholder="Введите задачу" allowClear="true" onPressEnter=""/>
    </Form.Item>
    <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
          </Space>
      </Form.Item>
    </Form>
  );
};

export default Demo;