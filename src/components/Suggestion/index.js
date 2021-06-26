import { Button, Checkbox, Divider, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import './styles.scss';
const { TextArea, Search } = Input;

const Suggestion = (props) => {
  const [form] = Form.useForm();
  const { row, suggestions, createSuggestion, onSave } = props;
  const [previewNote, setPreviewNote] = useState('');

  useEffect(() => {
    if (row?.Note) {
      const values = row?.Note;
      setPreviewNote(values);
    } else {
      setPreviewNote('');
    }
  }, [form, row?.Note, suggestions]);

  useEffect(() => {
    const contents = previewNote.split(',');
    const newSuggestions = suggestions
      ?.filter((item) => contents.includes(item.content))
      .map((item) => item.id);
    form.setFieldsValue({ suggestions: newSuggestions });
  }, [form, previewNote, suggestions]);

  const onClickCheckbox = (event) => {
    const id = event.target.value;
    const existedContent = suggestions.find((item) => item.id === id).content;
    setPreviewNote((prev) => {
      if (prev.includes(existedContent)) {
        const pos = prev.indexOf(existedContent);
        const newContent =
          prev.slice(0, pos) + prev.slice(pos + existedContent.length + 1);
        return newContent;
      } else return `${prev}${existedContent},`;
    });
  };

  const onTextAreaChange = (event) => {
    const values = event.target.value;
    setPreviewNote(values);
  };

  const handleSubmit = () => {
    const newRow = { ...row, Note: previewNote };
    onSave(newRow);
  };

  const handleClear = () => {
    setPreviewNote('');
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
          <Form form={form}>
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
            <Row>
              <Button size="large" className="btn" onClick={handleClear}>
                Clear
              </Button>
              <Button
                type="primary"
                size="large"
                className="btn"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Row>
          </Form>
        </>
      )}
    </>
  );
};

export default Suggestion;
