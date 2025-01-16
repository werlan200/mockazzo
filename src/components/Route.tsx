import { Switch } from 'antd';
import { useCollectionContext } from '../context/CollectionContext';
import { MockedRoute as MockedRouteType } from '../context/CollectionContext.types';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

type RouteProps = {
  route: MockedRouteType;
};

export const Route = ({ route }: RouteProps) => {
  const { setSelectedId, updateRoute } = useCollectionContext();

  return (
    <div key={route.id} className="route">
      <div onClick={() => setSelectedId(route.id)}>
        {route.isMocking ? (
          <CheckCircleOutlined style={{ fontSize: '14px', color: '#33cc33' }} />
        ) : (
          <CloseCircleOutlined style={{ fontSize: '14px', color: '#ff0000' }} />
        )}
        <span style={{ marginLeft: '8px' }}>{route.label}</span>
      </div>
      <Switch
        size="small"
        value={route.isMocking}
        onChange={(isMocking) => updateRoute(route.id, { isMocking })}
      />
    </div>
  );
};
