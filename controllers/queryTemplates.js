const updateWithImage = 'UPDATE bookTable \
SET title=$/title/, \
author=$/author/, price=$/price/,\
genre=$/genre/, quantity=$/quantity/, \
image_url=$/image_url/ \
WHERE title=$/title/';

const updateWithoutImage = 'UPDATE bookTable \
SET title=$/title/,\
author=$/author/, price=$/price/,\
genre=$/genre/, quantity=$/quantity/\
WHERE title=$/title/';

const createWithImage = 'INSERT INTO bookTable (title, reference_number, author, price, genre, quantity, image_url) \
VALUES($/title/,$/reference_number/,$/author/,$/price/,$/genre/,$/quantity/, $/image_url/) \
ON CONFLICT (title) \
DO UPDATE SET quantity=bookTable.quantity+1 \
WHERE bookTable.title=$/title/'

const createWtihoutImage = 'INSERT INTO bookTable (title, reference_number, author, price, genre, quantity, image_url) \
VALUES($/title/,$/reference_number/,$/author/,$/price/,$/genre/,$/quantity/) \
ON CONFLICT (title) \
DO UPDATE SET quantity=bookTable.quantity+1 \
WHERE bookTable.title=$/title/'

module.exports = {updateWithImage, updateWithoutImage, createWithImage, createWtihoutImage};