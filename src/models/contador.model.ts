import mongoose, { Document, Schema } from 'mongoose';

interface IContador extends Document {
  nombre: string;
  valor: number;
}

const ContadorSchema: Schema = new Schema({
  nombre: { type: String, required: true, unique: true },
  valor: { type: Number, required: true, default: 1 },
});

export default mongoose.model<IContador>('Contador', ContadorSchema);
