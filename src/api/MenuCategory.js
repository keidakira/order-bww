// All MenuCategory related APIs go here
import client from "../api";

class MenuCategory {
  getAllMenuCategories = async () => {
    const response = await client.get("/menu-categories");
    return response;
  };
}

export default MenuCategory;
