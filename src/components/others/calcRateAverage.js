const calcRateAverage = (values) => {
  const valuesKeys = Object.keys(values);
  return (
    valuesKeys.reduce((sum, key) => {
      if (key.includes('grade')) {
        return sum + values[key];
      }
      return sum + 0;
    }, 0) / 7
  );
};
export default calcRateAverage;
