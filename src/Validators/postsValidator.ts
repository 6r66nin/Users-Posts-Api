import { AppError } from "../Classes/appErrors";
import { Postcreate } from "../Types/Post";
import { validateId } from "./utilsValidators";

export namespace postValidator {
  
    const validateContent = (cont: string): boolean => {
        return cont.trim().length > 0;
    }
  
    const isPost = (post: unknown): post is Postcreate => {
      return (
        typeof post == "object" &&
        post != null &&
        typeof (post! as Postcreate).user_id === "number" &&
        typeof (post! as Postcreate).content === "string"
      );
    };
    
    const iseditPost = (post: unknown): post is Postcreate => {
      return (
        typeof post == "object" &&
        post != null &&
        typeof (post! as Postcreate).content === "string"
      );
    };

  export const validatePost = (post: unknown): Postcreate => {
    

    if (!isPost(post)) {
      throw new AppError(400, "Invalid Data");
    }
    
    if (!validateId(post.user_id)) {

        throw new AppError(400, "Invalid user ID");   
    }

    if (!validateContent(post.content)) {
      throw new AppError(400, "Content is empty");
    }
    
    return post as Postcreate;
  };
  
  export const validateEditpost = (post: unknown): Postcreate => {
    
    if (!iseditPost(post)) {
      throw new AppError(400, "Invalid Data");
    }
    
    if (!validateContent(post.content)) {
      throw new AppError(400, "Content is empty");
    }
    
    return post as Postcreate;
  };





}
