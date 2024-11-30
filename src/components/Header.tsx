import { useCollectionContext } from "../context/CollectionContext";
import { Button, Flex, Modal } from "antd";
import {
  PoweroffOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import { Checkbox } from "antd";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedCollections, setCheckedCollections] = useState([]);

  const {
    isMockazzoOn,
    toggleMockazzoOn,
    collections,
    exportCollections,
    importCollections,
  } = useCollectionContext();
  const iconStyle = {
    color: isMockazzoOn ? "red" : "gray",
    fontSize: "20px",
  };

  const handleOk = () => {
    setIsModalOpen(false);
    exportCollections(checkedCollections);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCheckedCollections([]);
  };

  const options = collections
    .filter((collection: any) => collection?.routes?.length > 0)
    .map((collection: any) => {
      return { label: collection.label, value: collection.id };
    });

  return (
    <>
      <Flex gap={16} align="center" justify="end" className="mockazzoHeader">
        <Flex gap={6}>
          <Button
            onClick={importCollections}
            icon={<ImportOutlined style={{ fontSize: "20px" }} />}
            type="text"
            shape="circle"
          ></Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<ExportOutlined style={{ fontSize: "20px" }} />}
            type="text"
            shape="circle"
          ></Button>
        </Flex>
        <Button
          onClick={toggleMockazzoOn}
          icon={<PoweroffOutlined style={iconStyle} />}
          type="text"
          shape="circle"
        ></Button>
      </Flex>
      <Modal
        title="Export Collections"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Copy Export Data"
      >
        <Checkbox.Group options={options} onChange={setCheckedCollections} />
      </Modal>
    </>
  );
};

export default Header;
