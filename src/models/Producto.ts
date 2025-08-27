import mongoose, { Schema, Document } from 'mongoose';

export interface IProducto extends Document {
  nombre: string;
  detalles: string;
  categoria: mongoose.Types.ObjectId;
}

const productoSchema = new Schema<IProducto>({
  nombre: { type: String, required: true, unique: true },
  detalles: { type: String },
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true }
});


export const Producto = mongoose.model<IProducto>('Producto', productoSchema);
