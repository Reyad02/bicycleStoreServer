import Ibicycle from './bicycle.interface';
import Bicycle from './bicycle.model';

const createBicycle = async (bicycle: Ibicycle): Promise<Ibicycle> => {
  const result = await Bicycle.create(bicycle);
  return result;
};

const getBicycles = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const result = await Bicycle.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { type: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    return result;
  } else {
    const result = await Bicycle.find();
    return result;
  }
};

const getSingleBicycle = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};

const updateSingleBicycle = async (id: string, payload: Ibicycle) => {
  const result = await Bicycle.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSingleBicycle = async (id: string) => {
  const result = await Bicycle.findByIdAndDelete(id);
  return result;
};

export const bicycleService = {
  createBicycle,
  getBicycles,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
};
