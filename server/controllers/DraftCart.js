// Controller for DraftCarts Model
const DraftCart = require("../models/DraftCart");
const Item = require("../models/Item");

module.exports = {
  // Create a Draft Cart
  createDraftCart: async (req, res, next) => {
    const itemId = req.body.id;
    const quantity = req.body.quantity;

    const user = req.user;

    const item = await Item.findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    // Now add the item to a newly created DraftCart
    const draftCart = new DraftCart({
      items: [
        {
          item: itemId,
          quantity,
        },
      ],
      user: req.user._id,
      total: item.price * quantity,
    });

    // Save the draft cart
    draftCart.save((err, draftCart) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Could not create draft cart",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Draft cart created",
        draftCart,
      });
    });
  },

  // Get a user's draft cart
  getDraftCart: async (req, res, next) => {
    const user = req.user;

    // Find the draft cart
    const draftCart = await DraftCart.findOne({ user: user._id }).populate(
      "items.item"
    );

    if (!draftCart) {
      return res.status(404).json({
        status: "error",
        message: "Draft cart not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Draft cart retrieved",
      draftCart,
    });
  },

  // Update a draft cart
  updateDraftCart: async (req, res, next) => {
    const { id: itemId, quantity } = req.body;
    const user = req.user;

    let returnStatus = 200;

    // Find the draft cart with the user id
    const draftCart = await DraftCart.findOne({ user: user._id });
    let total = draftCart.total;

    if (!draftCart) {
      return res.status(404).json({
        status: "error",
        message: "Draft cart not found",
      });
    }

    const draftItems = draftCart.items;

    // Find the item in the draft cart
    const itemIndex = draftItems.findIndex(
      (item) => item.item.toString() === itemId
    );

    // Get item details
    const item = await Item.findOne({ _id: itemId });

    // If quantity is 0, remove the item from the draft cart
    if (quantity === 0) {
      const delResp = await DraftCart.updateOne(
        { user: user._id },
        {
          $pull: {
            items: { item: itemId },
          },
          $set: {
            total: total - item.price * draftItems[itemIndex].quantity,
          },
        }
      );

      if (delResp.nModified === 0) {
        return res.status(404).json({
          status: "error",
          message: "Item not found in draft cart",
        });
      }

      // If only one item is left in the cart,
      // then delete the draft cart
      if (draftItems.length === 1 && quantity === 0) {
        const deleteCartResponse = await DraftCart.deleteOne({
          user: user._id,
        });

        if (deleteCartResponse.deletedCount === 0) {
          returnStatus = 500;
          return res.status(returnStatus).json({
            status: "error",
            message: "Could not delete draft cart",
          });
        }

        return res.status(200).json({
          status: "success",
          message: "Draft cart deleted",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Item deleted from Draft cart",
      });
    }

    // If the item is already in the draft cart, update the quantity
    if (itemIndex !== -1) {
      if (draftItems[itemIndex].quantity > quantity) {
        // So user is removing a quantity of the item
        total -= item.price;
      } else {
        // User is increasing the quantity of the item
        total += item.price;
      }

      draftItems[itemIndex].quantity = quantity;
    } else {
      // If the item is not in the draft cart, add it
      const newItem = {
        item: itemId,
        quantity,
      };

      total += item.price;

      draftItems.push(newItem);
      returnStatus = 201;
    }

    // Update the draft cart
    const response = await DraftCart.updateOne(
      { user: user._id },
      {
        items: draftItems,
        total: total,
      }
    );

    if (!response) {
      return res.status(400).json({
        status: "error",
        message: "Draft cart not could not be updated",
      });
    }

    return res.status(returnStatus).json({
      status: "success",
      message: "Draft cart updated",
    });
  },

  // Delete a draft cart
  deleteDraftCart: async (req, res, next) => {
    const user = req.user;

    const response = await DraftCart.deleteOne({ user: user._id });

    if (!response) {
      return res.status(400).json({
        status: "error",
        message: "Draft cart not could not be deleted",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Draft cart deleted",
    });
  },
};
