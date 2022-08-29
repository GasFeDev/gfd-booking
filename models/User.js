import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
/* Los esquemas Mongoose admiten una timestampsopción. Si establece timestamps: true, Mongoose agregará dos propiedades de tipo Datea su esquema:
createdAt: una fecha que representa cuándo se creó este documento
updatedAt: una fecha que representa cuándo se actualizó este documento por última vez
Mongoose se configurará createdAtcuando el documento se inserte por primera vez y se actualizará updatedAtcada vez que actualice el documento usando save(), updateOne(), updateMany(), findOneAndUpdate(), update(), replaceOne()o bulkWrite(). */

export default mongoose.model("User", UserSchema);

/* Ejemplo:
Como los esquemas author y book demuestran la flexibilidad del esquema de Mongoose, voy a continuar usando esos esquemas y derivar un modelo Author y Book de ellos.
var Author = mongoose.model('Author', authorSchema);
var Book = mongoose.model('Book', bookSchema);
Un modelo, cuando se guarda, crea un documento en MongoDB con las propiedades definidas por el esquema del que se deriva.
*/
