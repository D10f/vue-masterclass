export const findById = (resource, id) => {
  return resource.find((r) => r.id === id);
};

// const thread = findById(state['threads'], threadId);
// thread.posts = thread.posts || [];
// thread.posts.push(postId);

// export const appendToResource = (resource, itemId) => {
//   const res = findById(resource, itemId);

// };
