import User from './user.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {},
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString();
  const incrementIdLength = incrementId.length;
  incrementId = incrementId.padStart(6 - incrementIdLength, '0');
  // console.log(incrementId)
  return incrementId;
};
