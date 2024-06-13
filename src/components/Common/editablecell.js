import { useState } from "react";
import { Input, InputNumber, Form, Select } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  selectOptions,
  onSelection,
  ...restProps
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const inputNode =
    inputType === "number" ? (
      <InputNumber style={{ width: "100%" }} />
    ) : (
      <Input
        onClick={editing ? handleSelectOpen : undefined}
        onBlur={handleSelectClose}
        onFocus={handleSelectOpen}
        style={{ width: "100%" }}
      />
    );

  // Get the value based on dataIndex
  const value = dataIndex ? record[dataIndex] : "";

  return (
    <td {...restProps} style={{ position: "relative", width: "auto" }}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
            display: "grid",
            // width: "max-content",
          }}
          initialValue={value} // Use 'initialValue' instead of 'defaultValue'
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {inputType === "select" ? (
            <Select
              showSearch
              onBlur={handleSelectClose}
              onFocus={handleSelectOpen}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}>
              {selectOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          ) : (
            inputNode
          )}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
