const Item = require("../models/itemModel");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

exports.addItem = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newItem = new Item({ name, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, isPurchased, quantity } = req.body; // Include 'name' here
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, isPurchased, quantity }, // Include 'name' in the update
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" }); // Handle case when item is not found
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};
