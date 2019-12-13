let jsonProduct = require('../../assets/product-data.json');
let jsonMarketing = require('../../assets/panels-data.json');

export function get(name: 'product' | 'marketing') {
    if (name === 'product') return jsonProduct;
    if (name === 'marketing') return jsonMarketing;
}