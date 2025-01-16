import { Collection as CollectionType } from '../context/CollectionContext.types';
import { Route } from './Route';

export type CollectionProps = {
  collection: CollectionType;
  onSelect: (id: string) => void;
};

export const Collection = ({ collection }: CollectionProps) => {
  const isEmpty = collection.routes.length === 0;

  if (isEmpty) {
    return (
      <div className="empty-collection">
        <p>No routes found in this collection</p>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="route-wrapper">
        {collection.routes.map((route) => (
          <Route key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
};
