'use strict';
var Sequelize = require('sequelize-cockroachdb');
const { path } = require('../app');

//const connectionString ="postgresql://root@localhost:26258/defaultdb?sslmode=disable"
const connectionString ="postgresql://root@localhost:26257/defaultdb?sslcert=certs%5Cclient.root.crt&sslkey=certs%5Cclient.root.key&sslmode=verify-full&sslrootcert=certs%5Cca.crt"
// const connectionString ="postgresql://ilija:apMzphHtRGyeKr4pEWun5w@superb-pup-4431.7tc.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {cockroachdbTelemetryDisabled : true}
});

// if (process.env.ADDR === undefined) {
//   throw new Error("ADDR (database URL) must be specified.");
// }

// var sequelize = new Sequelize(process.env.ADDR, {
//   dialectOptions: {cockroachdbTelemetryDisabled : true}
// });
var DataTypes = Sequelize.DataTypes;

if (!Sequelize.supportsCockroachDB) {
  throw new Error("CockroachDB dialect for Sequelize not installed");
}

const Customer=sequelize.define('Customer',{
  name: DataTypes.STRING,
  email:  DataTypes.STRING,
  password: DataTypes.STRING},
  {timestamps:false}
)

const Product=sequelize.define('Product',{
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(18, 2),
    description: {
      type:DataTypes.STRING,
      defaultValue:"on sale"},
      picture:{
        type:DataTypes.STRING,
        required:true
      }
    },
    {timestamps:false}
)
const imageBasePath = 'upload'
const Order = sequelize.define('Order', {});
Customer.belongsToMany(Product, { through: 'Order' });
Product.belongsToMany(Customer, { through: 'Order' });
// Product.virtual('picturePath').get(function() {
//   if (this.picture != null){
//     return path.join('/',imageBasePath,this.picture)
//   }
// })
// Customer.hasMany(Order,{as:"orders"})

// Order.belongsTo(Customer, {
//   foreignKey: "customerid",
//   as: "customer",
// });
module.exports.imageBasePath=imageBasePath
module.exports.Customer=Customer
// module.exports.customerToJSON=customerToJSON


module.exports.Product=Product
module.exports.Order=Order

// module.exports.orderToJSON=orderToJSON


// module.exports.OrderProduct = sequelize.define('order_products', {
//   order_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true
//   },
//   product_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true
//   }
// }, {
//   timestamps: false
// });


module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
