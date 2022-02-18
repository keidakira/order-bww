// All Draft Cart related APIs go here
import client from "../api";

export default {
  createDraftCart: async (itemId, quantity) => {
    const response = await client.post("/draft-cart", {
      id: itemId,
      quantity,
    });

    return response;
  },

  getDraftCart: async () => {
    try {
      const response = await client.get("/draft-cart");

      return response;
    } catch (error) {
      return {
        data: {
          error: true,
          message: "No cart for the user",
          draftCart: {
            items: [],
            total: 0,
          },
        },
      };
    }
  },

  updateDraftCart: async (itemId, quantity) => {
    const response = await client.put("/draft-cart", {
      id: itemId,
      quantity,
    });

    return response;
  },
};
