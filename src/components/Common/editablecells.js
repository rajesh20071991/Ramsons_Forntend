import { useState, useEffect } from "react";
import { Input, InputNumber, Form, Select } from "antd";

const EditableCells = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  selectOptions,
  parentValue,
  onSelection,
  handleSave,
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

  // Filter selectOptions based on parentValue
  const filteredOptions =
    inputType === "select" && parentValue
      ? selectOptions.filter((option) => option.parent === parentValue)
      : selectOptions;

  return (
    <td {...restProps} style={{ position: "relative" }}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
            display: "grid",
          }}
          initialValue={value}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {inputType === "select" ? (
            <Select
              showSearch
              onChange={(selectedValue) =>
                handleSave(selectedValue, dataIndex, record)
              }
              onBlur={handleSelectClose}
              onFocus={handleSelectOpen}
              style={{ width: "100%" }}>
              {filteredOptions.map((option) => (
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

export default EditableCells;
