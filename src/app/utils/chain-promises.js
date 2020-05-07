export default async (arr, promise) => {
  return arr.reduce(
    async (previous, arg) => {
      await previous;
      return promise(arg);
    },
    Promise.resolve(),
  );
};