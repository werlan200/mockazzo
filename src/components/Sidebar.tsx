import { Button, Input, Modal, Row, Tooltip } from "antd";
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
    <>
      <Row>
        <Button
          block
          type="primary"
          onClick={onNewCollectionClick}
          icon={<PlusOutlined />}
          style={{ borderRadius: "0px", height: "64px" }}
        >
          New Collection
        </Button>
      </Row>
      <div className="sider__collections">
        {collections.map((collection: Collection) => {
          return (
            <div className="wrapper" key={collection.id}>
              <div className="collection-wrapper">
                {collection.label}{" "}
                <div className="col-btn-grp">
                  <Tooltip title="Add Route" placement="bottom" color="#721e5a">
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => onAddClick(collection.id)}
                    ></Button>
                  </Tooltip>
                  <Tooltip
                    title="Edit Collection"
                    placement="bottom"
                    color="#721e5a"
                  >
                    <Button
                      size="small"
                      icon={<MoreOutlined />}
                      onClick={() => setSelectedCollection(collection.id)}
                    ></Button>
                  </Tooltip>
                </div>
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
    </>
  );
};

export default Sidebar;
