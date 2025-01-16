import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useCollectionContext } from '../context/CollectionContext';

export type CollectionHeaderProps = {
  collectionId: string;
  onSelectedCollectionChange: (id: string) => void;
};

const CollectionHeader = ({
  collectionId,
  onSelectedCollectionChange,
}: CollectionHeaderProps) => {
  const { addRouteToCollection } = useCollectionContext();

  const onPlusClick = (e: any) => {
    e.stopPropagation();
    addRouteToCollection(collectionId);
  };

  const onMoreClick = (e: any) => {
    e.stopPropagation();
    onSelectedCollectionChange(collectionId);
  };

  return (
    <div className="col-btn-grp">
      <Tooltip title="Add Route" placement="bottom" color="#721e5a">
        <Button
          size="small"
          icon={<PlusOutlined />}
          onClick={onPlusClick}
        ></Button>
      </Tooltip>
      <Tooltip title="Edit Collection" placement="bottom" color="#721e5a">
        <Button
          size="small"
          icon={<MoreOutlined />}
          onClick={onMoreClick}
        ></Button>
      </Tooltip>
    </div>
  );
};

export default CollectionHeader;
