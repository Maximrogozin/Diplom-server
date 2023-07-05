const Description = require("../models/Descriptions");
const descriptionsMock = require("../mock/descriptions");

module.exports = async () => {
  const descriptions = await Description.find();
  if (descriptions.length !== descriptionsMock.length) {
    await createInitialEntity(Description, descriptionsMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
