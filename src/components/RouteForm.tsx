import { Input, Row, Col, Select, Button, Form, Switch } from "antd";
import { MockedRoute } from "../context/CollectionContext.types";
import { useCollectionContext } from "../context/CollectionContext";
import type { FormProps } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

const { Option } = Select;

const onFinishFailed: FormProps<MockedRoute>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

const RouteForm = () => {
  const [form] = Form.useForm();

  const { selectedId, getRoute, deleteRoute, updateRoute, setSelectedId } =
    useCollectionContext();

  const foundRoute = getRoute(selectedId);

  const onBeautify = () => {
    let parsedJson = JSON.parse(form.getFieldValue("response"));
    const beautifiedJson = JSON.stringify(parsedJson, null, 4);

    form.setFieldValue("response", beautifiedJson);
  };

  const onFinish = (values: MockedRoute) => {
    updateRoute(selectedId, values);
    setSelectedId("");
  };

  useEffect(() => {
    if (form) form.resetFields();
  }, [selectedId]);

  if (!selectedId) return <></>;

  return (
    <Form
      form={form}
      name={selectedId}
      initialValues={foundRoute}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="mockazzoForm"
    >
      <Form.Item<MockedRoute>
        label="Url"
        name="url"
        rules={[{ required: true, message: "Please input your username!" }]}
        className="mockazzoForm__url"
      >
        <Input />
      </Form.Item>

      <Form.Item<MockedRoute>
        label="Label"
        name="label"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            name="method"
            label="Method"
            rules={[{ required: true }]}
            className="rowItem"
          >
            <Select placeholder="Select a option and change input text above">
              <Option value="GET">GET</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<MockedRoute>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<MockedRoute>
            label="Delay"
            name="delay"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input addonAfter="ms" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item<MockedRoute> label="Is Mocking" name="isMocking">
        <Switch />
      </Form.Item>

      <Form.Item label={null}>
        <Button htmlType="button" onClick={onBeautify}>
          Beautify Response
        </Button>
      </Form.Item>

      <Form.Item name="response" label="Response" rules={[{ required: true }]}>
        <TextArea style={{ minHeight: "200px" }} />
      </Form.Item>

      <Row justify="center" gutter={8}>
        <Col>
          <Form.Item label={null}>
            <Button
              color="danger"
              htmlType="button"
              onClick={() => deleteRoute(selectedId)}
            >
              Delete
            </Button>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RouteForm;
