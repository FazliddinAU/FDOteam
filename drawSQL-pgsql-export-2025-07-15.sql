CREATE TABLE "User"(
    "id" BIGINT NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) CHECK
        ("role" IN('USER', 'ADMIN', 'SELLER')) NOT NULL DEFAULT 'USER'
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
CREATE TABLE "Product"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" BIGINT NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "image" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Product" ADD PRIMARY KEY("id");
CREATE TABLE "Category"(
    "id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Category" ADD PRIMARY KEY("id");
CREATE TABLE "Cart"(
    "id" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "totalPrice" BIGINT NOT NULL,
    "cartItemId" BIGINT NOT NULL
);
ALTER TABLE
    "Cart" ADD PRIMARY KEY("id");
CREATE TABLE "Order"(
    "id" BIGINT NOT NULL,
    "status" VARCHAR(255) CHECK
        (
            "status" IN(
                'PENDING',
                'CANCELLED',
                'ON THE WAY',
                'SHIPPED'
            )
        ) NOT NULL DEFAULT 'PENDING',
        "userId" BIGINT NOT NULL,
        "orderDate" DATE NOT NULL,
        "orderItemId" BIGINT NOT NULL
);
ALTER TABLE
    "Order" ADD PRIMARY KEY("id");
CREATE TABLE "Payment"(
    "id" BIGINT NOT NULL,
    "paymentType" VARCHAR(255) CHECK
        (
            "paymentType" IN('CASH', 'CREDIT CARD', 'DEBIT CARD')
        ) NOT NULL DEFAULT 'CREDIT CARD',
        "orderId" BIGINT NOT NULL
);
ALTER TABLE
    "Payment" ADD PRIMARY KEY("id");
CREATE TABLE "Review"(
    "id" BIGINT NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "productId" BIGINT NOT NULL
);
ALTER TABLE
    "Review" ADD PRIMARY KEY("id");
CREATE TABLE "OrderItem"(
    "id" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "quantity" BIGINT NOT NULL
);
ALTER TABLE
    "OrderItem" ADD PRIMARY KEY("id");
CREATE TABLE "Reserve"(
    "id" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "productQuantity" BIGINT NOT NULL
);
ALTER TABLE
    "Reserve" ADD PRIMARY KEY("id");
CREATE TABLE "product_to_category"(
    "id" BIGINT NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL
);
ALTER TABLE
    "product_to_category" ADD PRIMARY KEY("id");
CREATE TABLE "CartItem"(
    "id" BIGINT NOT NULL,
    "cartId" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "productQuantity" BIGINT NOT NULL,
    "totalPrice" BIGINT NOT NULL
);
ALTER TABLE
    "CartItem" ADD PRIMARY KEY("id");
ALTER TABLE
    "Order" ADD CONSTRAINT "order_orderitemid_foreign" FOREIGN KEY("orderItemId") REFERENCES "OrderItem"("id");
ALTER TABLE
    "OrderItem" ADD CONSTRAINT "orderitem_productid_foreign" FOREIGN KEY("productId") REFERENCES "Product"("id");
ALTER TABLE
    "product_to_category" ADD CONSTRAINT "product_to_category_productid_foreign" FOREIGN KEY("productId") REFERENCES "Product"("id");
ALTER TABLE
    "Payment" ADD CONSTRAINT "payment_orderid_foreign" FOREIGN KEY("orderId") REFERENCES "Order"("id");
ALTER TABLE
    "Cart" ADD CONSTRAINT "cart_cartitemid_foreign" FOREIGN KEY("cartItemId") REFERENCES "CartItem"("id");
ALTER TABLE
    "Review" ADD CONSTRAINT "review_userid_foreign" FOREIGN KEY("userId") REFERENCES "Product"("name");
ALTER TABLE
    "product_to_category" ADD CONSTRAINT "product_to_category_categoryid_foreign" FOREIGN KEY("categoryId") REFERENCES "Category"("id");
ALTER TABLE
    "CartItem" ADD CONSTRAINT "cartitem_productid_foreign" FOREIGN KEY("productId") REFERENCES "Product"("id");
ALTER TABLE
    "Review" ADD CONSTRAINT "review_userid_foreign" FOREIGN KEY("userId") REFERENCES "User"("id");
ALTER TABLE
    "Order" ADD CONSTRAINT "order_userid_foreign" FOREIGN KEY("userId") REFERENCES "User"("id");
ALTER TABLE
    "Cart" ADD CONSTRAINT "cart_userid_foreign" FOREIGN KEY("userId") REFERENCES "User"("id");
ALTER TABLE
    "Reserve" ADD CONSTRAINT "reserve_productid_foreign" FOREIGN KEY("productId") REFERENCES "Product"("id");