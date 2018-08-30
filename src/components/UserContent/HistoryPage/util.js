export const getOrderInfo = order => {
  return {
    additional: order.additional,
    created: order.created,
    place: order.session.selectedPlaces[order.place] || { x: null, y: null }
  };
};
