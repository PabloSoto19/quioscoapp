import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { handleSetProducto, handleChangeModal } = useQuiosco();
  const { nombre, imagen, precio, stock } = producto;

  const agregarProducto = () => {
    if (stock === 0) {
      // El stock es igual a 0, no se puede agregar el producto
      return;
    }

    handleChangeModal();
    handleSetProducto(producto);
  };

  const botonClassName = stock === 0 ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-800';

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-2 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
          
        </p>

        <button
          type="button"
          className={`text-white w-full mt-5 p-3 uppercase font-bold ${botonClassName}`}
          onClick={agregarProducto}
          disabled={stock === 0} // Desactiva el botón si el stock es igual a 0
        >
          {stock === 0 ? 'Agotado' : 'Agregar'}
        </button>
      </div>
    </div>
  );
};

export default Producto;
