import { Tree, Button, Flex } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCollectionContext } from "../context/CollectionContext";
import { useState } from "react";
import { Collection } from "../context/CollectionContext.types";

const Sidebar = () => {
  const {
    selectedId,
    setSelectedId,
    collections,
    addCollection,
    addRouteToCollection,
  } = useCollectionContext();

  const onAddClick = (id: string) => {
    addRouteToCollection(id);
  };

  const onNewCollectionClick = () => {
    setSelectedId("");
    addCollection();
  };

  return (
    <div>
      <Flex gap="small">
        <Button
          type="primary"
          onClick={onNewCollectionClick}
          icon={<PlusOutlined />}
        >
          New Collection
        </Button>
      </Flex>
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
    </div>
  );
};

export default Sidebar;
