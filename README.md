# Bi-Cycle Store Backend   
Welcome to the backend of the Bi-Cycle Store project! This backend API is designed to manage bicycle data, user authentication, and handle order management for the Bi-Cycle Store.

## Features  
- **Product Management**: CRUD operations for bicycle products (create, read, update, delete).  
- **Order Management**: Place order for bicycle.  
- **Revenue Earned**: Find out total revenue.

---

## Tech Stack 
This project is built using modern web development technologies:  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose (for ODM)  

---

## Installation and Setup   

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Reyad02/bicycleStoreServer.git
   cd bicycleStoreServer
   ```

2. **Install Dependencies**
  ```bash
  npm install
   ```


3. **Set Up Environment Variables**
   ```env
   PORT=port-number
   DATABASE_URI=your-mongodb-connection-string
  
4. **Start the Application**
   ```bash
   npm run dev  
   ```

---

## Routes

### **1. Create a Bicycle**

- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Roadster 5000",
  "brand": "SpeedX",
  "price": 300,
  "type": "Road",
  "description": "A premium road bike designed for speed and performance.",
  "quantity": 20,
  "inStock": true
}
```

- **Response:** Success message and created bicycle details.

```json
{
  "message": "Bicycle created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 300,
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 20,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### **2. Get All Bicycles**

- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Response:** A list of all bicycles with details like name, brand, price, type, etc.
- **Query:** `/api/products?searchTerm=type` (`searchTerm` can be `name`, `brand`, `type`)

```json
{
  "message": "Bicycles retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Roadster 5000",
      "brand": "SpeedX",
      "price": 300,
      "type": "Road",
      "description": "A premium road bike designed for speed and performance.",
      "quantity": 20,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

---

### **3. Get a Specific Bicycle**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific bicycle by ID.

```json
{
  "message": "Bicycle retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 300,
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 20,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### **4. Update a Bicycle**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Bicycle details to update)

```json
{
  "price": 350,
  "quantity": 15
}
```

- **Response:** Success message and updated bicycle details.

```json
{
  "message": "Bicycle updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 350, // Price updated
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 15, // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z" // Updated timestamp
  }
}
```

---

### **5. Delete a Bicycle**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the bicycle has been deleted.

```json
{
  "message": "Bicycle deleted successfully",
  "status": true,
  "data": {}
}
```

---

### **6. Order a Bicycle**

- **Endpoint:** **`/api/orders`**
- **Method:** `POST`
- **Inventory Management Logic:**
  - When an order is placed, reduce the **quantity** in the product model.
  - If the inventory quantity goes to zero, set **inStock** to `false`.
  - Handle **insufficient stock** cases by returning an appropriate error message.
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 600
}
```

- **Response:** Success message confirming the order.

```json
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 600,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}
```

---

### **7. Calculate Revenue from Orders (Aggregation)**

- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`
- **Aggregation Suggestion:**
  - Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
  - Calculate the total price by multiplying the price of each bicycle by the quantity ordered.
- **Response:** The total revenue from all orders.

```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 1200 // Total revenue calculated from all orders
  }
}
```

---



