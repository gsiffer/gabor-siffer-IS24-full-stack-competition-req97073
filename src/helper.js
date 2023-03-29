import React from 'react'

export const createId = (products) => {
  if (products.length > 0) {
    const productIds = [];
    products.map((product) => productIds.push(product.productId));

    return Math.max(...productIds) + 1;
  }
  return 1;
};


