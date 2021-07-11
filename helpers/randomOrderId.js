function randomOrderId(userId) {
  let orderId = Math.random().toString(36).replace('0.', userId || '');

  return orderId;
}

module.exports = randomOrderId;