import { Button, Checkbox, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
const { TextArea, Search } = Input;

const Suggestion = (props) => {
  const { suggestions, createSuggestion } = props;
  const [previewNote, setPreviewNote] = useState('');

  const onClickCheckbox = (event) => {
    const id = event.target.value;
    const existedContent = suggestions.find((item) => item.id === id).content;
    setPreviewNote((prev) => {
      if (prev.includes(existedContent)) {
        const pos = prev.indexOf(existedContent);
        const newContent =
          prev.slice(0, pos) + prev.slice(pos + existedContent.length + 1);
        return newContent;
      } else return `${prev}${existedContent};`;
    });
  };

  const onTextAreaChange = (event) => {
    setPreviewNote(event.target.value);
  };

  return (
    <>
      {suggestions && (
        <>
          <Divider>Suggestions</Divider>
          <Search
            placeholder="New suggestion"
            enterButton="Add"
            onSearch={(value) => createSuggestion(value)}
          />
          <Divider />
          <Form>
            <Form.Item name="suggestions">
              <Checkbox.Group>
                {suggestions.map((item) => (
                  <Row>
                    <Checkbox onClick={onClickCheckbox} value={item.id}>
                      {item.content}
                    </Checkbox>
                  </Row>
                ))}
              </Checkbox.Group>
            </Form.Item>

            <Divider>Preview Notes</Divider>
            <TextArea
              value={previewNote}
              rows={4}
              onChange={onTextAreaChange}
            />
            <Divider />
            <Button type="primary" size="large" className="save-btn">
              Save
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default Suggestion;
