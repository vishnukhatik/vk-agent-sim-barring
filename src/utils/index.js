export const progressObjectsWithlang = function(
  obj,
  selectSim,
  selectPayment,
  simBarring
) {
  obj[0].name = selectSim;
  obj[1].name = selectPayment;
  obj[2].name = simBarring;
  return obj;
};
