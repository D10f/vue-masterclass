export const findById = (resources, id) => resources.find((r) => r.id === id)

export const upsert = (resources, newResource) => {
  const index = resources.findIndex(r => r.id === newResource.id)
  if (newResource.id && index !== -1) {
    resources[index] = newResource
  } else {
    resources.push(newResource)
  }
}
