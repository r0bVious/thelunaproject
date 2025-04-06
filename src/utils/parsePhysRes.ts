export const parsePhysRes = (formData: FormData) => {
  const userId = formData.get("userId");
  const height = formData.get("height");
  const weight = formData.get("weight");
  const hoursSlept = formData.get("hoursSlept");
  const condition = formData.get("condition");

  if (
    !userId ||
    isNaN(Number(userId)) ||
    isNaN(Number(height)) ||
    isNaN(Number(weight)) ||
    isNaN(Number(hoursSlept)) ||
    isNaN(Number(condition))
  ) {
    throw new Error("Invalid form data");
  }

  return {
    userId: Number(userId),
    height: Number(height),
    weight: Number(weight),
    hoursSlept: Number(hoursSlept),
    condition: Number(condition),
  };
};
