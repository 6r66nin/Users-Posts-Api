import { AppError } from "../Classes/appErrors";
import { Usercreate } from "../Types/User";

export namespace userValidator {
  const validateName = (name: string): boolean => {
    name = name.trim();
    return name.length <= 50 && name.length > 0;
  };

  const validateAge = (age: number): boolean => {
    if (!Number.isInteger(age)) {
      age = Math.floor(age);
    }

    return age > 0 && age < 130;
  };

  const isUser = (user: unknown): user is Usercreate => {
    return (
      typeof user == "object" &&
      user != null &&
      typeof (user! as Usercreate).username === "string" &&
      typeof (user! as Usercreate).age === "number"
    );
  };

  export const validateUser = (user: unknown): Usercreate => {
    if (!isUser(user)) {
      throw new AppError(400, "invalid data");
    }

    if (!validateName(user.username)) {
      throw new AppError(400, "invalid username");
    }

    if (!validateAge(user.age)) {
      throw new AppError(400, "invalid age");
    }

    return user as Usercreate;
  };
}
