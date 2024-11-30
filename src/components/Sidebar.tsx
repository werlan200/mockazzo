import { Button, Input, Modal, Row } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { useCollectionContext } from "../context/CollectionContext";
import { Collection } from "../context/CollectionContext.types";
import { useState } from "react";

const Sidebar = () => {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [newCollectionLabel, setNewCollectionLabel] = useState("");

  const {
    setSelectedId,
    collections,
    addCollection,
    addRouteToCollection,
    deleteCollection,
    updateCollectionLabel,
  } = useCollectionContext();

  const onAddClick = (id: string) => {
    addRouteToCollection(id);
  };

  const onNewCollectionClick = () => {
    setSelectedId("");
    addCollection();
  };

  const onModalOk = () => {
    if (newCollectionLabel !== "")
      updateCollectionLabel(selectedCollection, newCollectionLabel);

    setNewCollectionLabel("");
    setSelectedCollection("");
  };

  return (
    <div>
      <Row>
        <Button
          block
          type="primary"
          onClick={onNewCollectionClick}
          icon={<PlusOutlined />}
        >
          New Collection
        </Button>
      </Row>
      {collections.map((collection: Collection) => {
        return (
          <div className="wrapper" key={collection.id}>
            <div className="collection-wrapper">
              {collection.label}{" "}
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => onAddClick(collection.id)}
              ></Button>
              <Button
                size="small"
                icon={<MoreOutlined />}
                onClick={() => setSelectedCollection(collection.id)}
              ></Button>
            </div>
            <div className="route-wrapper">
              {collection.routes.map((route) => (
                <div onClick={() => setSelectedId(route.id)} key={route.id}>
                  {route.label}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <Modal
        title="Edit Collection"
        open={selectedCollection !== ""}
        onOk={onModalOk}
        onCancel={() => {
          setSelectedCollection("");
          setNewCollectionLabel("");
        }}
        okText="Update"
        footer={[
          <Button
            key="delete"
            danger
            onClick={() => {
              deleteCollection(selectedCollection);
              setNewCollectionLabel("");
              setSelectedCollection("");
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
  );
};

export default Sidebar;
