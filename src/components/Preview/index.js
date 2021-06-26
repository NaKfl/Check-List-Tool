import { Divider, Row, Table } from 'antd';
import { EmbeddedPost, FacebookProvider } from 'react-facebook';

const Preview = (props) => {
  const { row, suggestions } = props;
  console.log('suggestions', suggestions);

  const link = row?.Link;

  const getIdsFromLink = (link) => {
    const code = link?.split('/');
    return {
      userId: code?.[3]?.split('_')[0],
      postId: code?.[3]?.split('_')[1],
    };
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: 'Source',
      dataIndex: 'Source',
      key: 'Source',
    },
    {
      title: 'Link',
      dataIndex: 'Link',
      key: 'Link',
      render: (link) => (
        <a target="_blank" rel="noopener noreferrer" href={link}>
          {link}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
    },
  ];

  return (
    <>
      {row && (
        <>
          <Divider>Information</Divider>
          <Table dataSource={[row]} columns={columns} pagination={false} />
          <Divider>Post</Divider>
          <Row>
            <FacebookProvider appId="243818813996519">
              <EmbeddedPost
                href={`https://www.facebook.com/${
                  getIdsFromLink(link).userId
                }/posts/${getIdsFromLink(link).postId}/`}
                width="500"
              />
            </FacebookProvider>
          </Row>
        </>
      )}
    </>
  );
};

export default Preview;
