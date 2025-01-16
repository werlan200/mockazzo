import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse, CollapseProps, Input, Modal, Row } from 'antd';
import { useState } from 'react';
import { useCollectionContext } from '../context/CollectionContext';
import { Collection as CollectionType } from '../context/CollectionContext.types';
import { Collection } from './Collection';
import CollectionHeader from './CollectionHeader';

const Sidebar = () => {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionLabel, setNewCollectionLabel] = useState('');

  const {
    setSelectedId,
    collections,
    addCollection,
    deleteCollection,
    updateCollectionLabel,
  } = useCollectionContext();

  // const collections = [
  //   {
  //     routes: [],
  //     id: 'c4661d31-30b8-4dc6-92bd-2127d828b215',
  //     label: 'collection-1',
  //   },
  // ];

  const onNewCollectionClick = () => {
    setSelectedId('');
    addCollection();
  };

  const onModalOk = () => {
    if (newCollectionLabel !== '')
      updateCollectionLabel(selectedCollection, newCollectionLabel);

    setNewCollectionLabel('');
    setSelectedCollection('');
  };

  const createCollectionAccordionsProps = (collections: CollectionType[]) => {
    const collectionAccordions: CollapseProps['items'] = collections.map(
      (collection: CollectionType) => {
        return {
          key: collection.id,
          label: collection.label,
          children: (
            <Collection
              collection={collection}
              onSelect={setSelectedCollection}
            />
          ),
          extra: (
            <CollectionHeader
              collectionId={collection.id}
              onSelectedCollectionChange={setSelectedCollection}
            />
          ),
        };
      }
    );

    return collectionAccordions;
  };

  return (
    <>
      <Row>
        <Button
          block
          type="primary"
          onClick={onNewCollectionClick}
          icon={<PlusOutlined />}
          style={{ borderRadius: '0px', height: '64px' }}
        >
          New Collection
        </Button>
      </Row>
      <div className="sider__collections">
        {collections.length > 0 ? (
          <Collapse
            ghost
            bordered={false}
            defaultActiveKey={[collections[0].id]}
            className="sider_collapse"
            items={createCollectionAccordionsProps(collections)}
          />
        ) : (
          <p className="sider__collections_empty">
            You must first create or import a collection
          </p>
        )}
        <Modal
          title="Edit Collection"
          open={selectedCollection !== ''}
          onOk={onModalOk}
          onCancel={() => {
            setSelectedCollection('');
            setNewCollectionLabel('');
          }}
          okText="Update"
          footer={[
            <Button
              key="delete"
              danger
              onClick={() => {
                deleteCollection(selectedCollection);
                setNewCollectionLabel('');
                setSelectedCollection('');
              }}
            >
              Delete Collection
            </Button>,
            <Button key="submit" type="primary" onClick={onModalOk}>
              Update
            </Button>,
          ]}
        >
          <Input
            placeholder="New collection label"
            onChange={(e) => setNewCollectionLabel(e.target.value)}
            value={newCollectionLabel}
          />
        </Modal>
      </div>
    </>
  );
};

export default Sidebar;
