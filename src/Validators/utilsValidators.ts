export const validateId = (id: unknown): boolean => {

  const parsedID = Number(id);

  return !(isNaN(parsedID) || parsedID <= 0);
};
