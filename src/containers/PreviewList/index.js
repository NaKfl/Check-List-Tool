import { Col, Row, Spin, Button, Input, Divider, notification } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WEB_API } from '../../utils/constants';
import Preview from '../../components/Preview';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import './styles.scss';
import Suggestion from '../../components/Suggestion';

const { Search } = Input;

const PreviewList = () => {
  const [input, setInput] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentNo, setCurrentNo] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [spinning, setSpinning] = useState(false);

  const onSearch = (value) => {
    if (!isNaN(+value)) setCurrentNo(+value);
  };

  const onSearchValueChange = (event) => {
    const { value } = event.target;
    if (!isNaN(+value)) setSearchValue(+value);
  };

  const onNext = () => {
    setCurrentNo((prev) => {
      if (prev + 1 < input.length) return prev + 1;
      return prev;
    });
  };

  const onPrevious = () => {
    setCurrentNo((prev) => {
      if (prev - 1 >= 1) return prev - 1;
      return prev;
    });
  };

  const getInputAPI = async () => {
    setSpinning(true);
    const response = await axios.get(`${WEB_API}/input`);
    if (response?.data?.data) {
      setInput(response.data.data);
      setSpinning(false);
    } else {
      notification.error({
        message: 'Get list failed',
      });
    }
  };

  const getSuggestionAPI = async () => {
    setSpinning(true);
    const response = await axios.get(`${WEB_API}/suggestion`);
    if (response?.data?.data) {
      setSuggestions(response.data.data);
      setSpinning(false);
    } else {
      notification.error({
        message: 'Get suggestion failed',
      });
    }
  };

  const createSuggestionAPI = async (content) => {
    setSpinning(true);
    const response = await axios.post(`${WEB_API}/suggestion/create`, {
      content,
    });
    if (response?.data) {
      setSpinning(false);
      getSuggestionAPI();
      notification.success({
        message: 'Create suggestion successfully',
      });
    } else {
      setSpinning(false);
      notification.error({
        message: 'Create suggestion failed',
      });
    }
  };

  const getRowFromNo = (no) => {
    const row = input.find((item) => +item.No === +no);
    return row;
  };

  useEffect(() => {
    getInputAPI();
    getSuggestionAPI();
  }, []);

  useEffect(() => {
    setSearchValue(currentNo);
  }, [currentNo]);

  return (
    <Spin spinning={spinning} tip="Loading...">
      <Row justify="center">
        <Col span={21}>
          <Divider>
            <h2>Checking Tool (Beta)</h2>
          </Divider>
          <Row gutter={[30, 0]}>
            <Col className="gutter-row" span={12}>
              <Preview
                row={getRowFromNo(currentNo)}
                suggestions={suggestions}
              />
            </Col>
            <Col className="gutter-row" span={8}>
              <Suggestion
                suggestions={suggestions}
                createSuggestion={createSuggestionAPI}
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Divider>Actions</Divider>
              <Row gutter={[3, 0]}>
                <Col span={4}>
                  <Button icon={<CaretLeftOutlined />} onClick={onPrevious} />
                </Col>
                <Col span={16}>
                  <Search
                    placeholder="No."
                    enterButton="Go"
                    value={searchValue}
                    onChange={onSearchValueChange}
                    onSearch={onSearch}
                  />
                </Col>
                <Col span={4}>
                  <Button icon={<CaretRightOutlined />} onClick={onNext} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};

export default PreviewList;
