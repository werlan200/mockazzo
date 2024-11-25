import { Tree, Button, Flex } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCollectionContext } from "../context/CollectionContext";

const Sidebar = () => {
  const { selectedId, setSelectedId, collections, addCollection } =
    useCollectionContext();

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);

    collections.forEach((collection: any) => {
      if (collection.id === info.node.key) {
        setSelectedId(collection.id);
      }
    });
  };

  const formatCollectionToTree = collections.map((collection: any) => {
    return {
      title: (data: any) => (
        <div>
          {collection.label} <Button icon={<PlusOutlined />}></Button>
        </div>
      ),
      key: collection.id,
      children: collection?.routes?.map((route: any) => {
        return {
          title: route.label,
          key: route.id,
        };
      }),
    };
  });

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
      <Tree
        defaultExpandAll
        onSelect={onSelect}
        treeData={formatCollectionToTree}
      />
    </div>
  );
};

export default Sidebar;
