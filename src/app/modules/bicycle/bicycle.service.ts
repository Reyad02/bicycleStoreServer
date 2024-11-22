import Ibicycle from './bicycle.interface';
import Bicycle from './bicycle.model';

const createBicycle = async (bicycle: Ibicycle): Promise<Ibicycle> => {
  const result = await Bicycle.create(bicycle);
  return result;
};

export const bicycleService = {
  createBicycle,
};
