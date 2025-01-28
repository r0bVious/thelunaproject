export const parsePhysRes = (formData: FormData) => {
  const userId = formData.get("userId");
  const height = formData.get("height");
  const weight = formData.get("weight");
  const hoursSlept = formData.get("hoursSlept");
  const condition = formData.get("condition");

  // const symptoms = [];
  // let i = 0;
  // while (formData.has(`symptoms[${i}]`)) {
  //   if (formData.get(`symptoms[${i}]`)) {
  //     const symptomValue = formData.get(`symptoms[${i}]`) as string;
  //     if (symptomValue !== null) {
  //       symptoms.push(parseInt(symptomValue, 10));
  //     }
  //   }
  //   i++;
  // }

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
    // symptoms: symptoms,
  };
};

export const parseSymptomRes = (symptoms) => {
  console.log(rawSymptoms);
  // if (!userId || !rawSymptoms) {
  //   throw new Error("Missing userId or symptoms data");
  // }

  // const symptoms = rawSymptoms
  //   .map((severityScale: number, index: number) => {
  //     if (severityScale === 0) return null;
  //     return {
  //       userId: Number(userId),
  //       symId: index + 1,
  //       severityScale,
  //     };
  //   })
  //   .filter((symptom) => symptom !== null);

  // return { symptoms };
};
