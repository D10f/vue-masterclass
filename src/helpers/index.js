export const findById = (resource, id) => {
  if (!resource) {
    return null;
  }
  return resource.find((r) => r.id === id);
};

export const upsert = (resource, item) => {
  const matchIdx = resource.findIndex((r) => r.id === item.id);

  if (matchIdx >= 0) {
    resource[matchIdx] = item;
  } else {
    resource.push(item);
  }
};

export const makeAppendItemToResource = ({ child, parent }) => {
  return (state, { childId, parentId }) => {
    const item = findById(state[parent], parentId);
    // item[child] = item[child] || [];
    const itemResources = new Set(item[child] || []);
    itemResources.add(childId);
    // item[child].push(childId);
    item[child] = Array.from(itemResources);
  };
};
