import { Pagination } from "../Types/Pagination";

const limit = 10;

const pagValidator = (page: string): Pagination => {
  const parsedNum = Number(page);

  const verifiedPage = (parsedNum || 1) <= 0 ? 1 : parsedNum;

  const offset = (verifiedPage - 1) * limit;

  return { limit, offset };
};

export default pagValidator;
