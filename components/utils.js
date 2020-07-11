export const capitalize = (str) => {
  return str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : str
}

export const slugToTitle = (str) => {
  return (str || "").split('_').pop().replace(/-/g, " ")
}