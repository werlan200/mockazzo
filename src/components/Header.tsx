import { useCollectionContext } from "../context/CollectionContext";
import { Button, Flex, Modal, Tooltip, Checkbox } from "antd";
import {
  PoweroffOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useState } from "react";

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
      <Flex align="center" justify="space-between" className="mockazzoHeader">
        <Flex align="center" gap={8}>
          <img src="/wheel-bgless.webp" width={20} height={20} />
          <h1>Mockazzo</h1>
        </Flex>
        <Flex gap={18}>
          <Flex gap={4}>
            <Tooltip title="Import Collections">
              <Button
                onClick={importCollections}
                icon={<ImportOutlined style={{ fontSize: "20px" }} />}
                type="text"
                shape="circle"
                className="actionBtn"
              ></Button>
            </Tooltip>
            <Tooltip title="Export Collections">
              <Button
                onClick={() => setIsModalOpen(true)}
                icon={<ExportOutlined style={{ fontSize: "20px" }} />}
                type="text"
                shape="circle"
                className="actionBtn"
              ></Button>
            </Tooltip>
          </Flex>
          <Tooltip
            title={isMockazzoOn ? "Turn Off Mockazzo" : "Turn On Mockazzo"}
          >
            <Button
              onClick={toggleMockazzoOn}
              icon={<PoweroffOutlined style={iconStyle} />}
              type="text"
              shape="circle"
              className="turnOnBtn"
            ></Button>
          </Tooltip>
        </Flex>
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
