import pool from "../Config/pool";
import { DatabaseError } from "../Classes/appErrors";

const queryExc = async <T> (
  contextMessage: string,
  query: string,
  queryparams: unknown[] = [],
  oneItem?: boolean
): Promise<T> => {
  try {
    
    const result = await pool.query(query, queryparams);
    
    return (oneItem ? result.rows[0] || null : result.rows) as T;

  } catch (error) {
    throw new DatabaseError((error as any).code, contextMessage);
  }
};

export default queryExc;
