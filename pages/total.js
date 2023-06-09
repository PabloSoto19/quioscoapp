import React, { useEffect, useCallback, useState } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
import emailjs from 'emailjs-com';

const Total = () => {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();
  const [metodoPago, setMetodoPago] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [codigoSeguridad, setCodigoSeguridad] = useState("");
 
  const [estado, setEstado] = useState("Estado de México");
  const [municipio, setMunicipio] = useState("");
  const [domicilio, setDomicilio] = useState("");

  const Municipios = {
    "Estado de México": [
      "Jilotepec",
      "Tepeji",
      "Chapa de Mota",
      // Agrega aquí más municipios
    ],
  };

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const formatCardNumber = (value) => {
    // Eliminar caracteres no numéricos
    const numericValue = value.replace(/\D/g, "");

    // Insertar un espacio cada 4 dígitos
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Limitar a 16 dígitos
    return formattedValue.slice(0, 19);
  };

  const comprobarPedido = useCallback(() => {
    return (
      pedido.length === 0 ||
      nombre === "" ||
      nombre.length < 3 ||
      metodoPago === "" ||
      email === "" ||
      numeroTarjeta === "" ||
      fechaVencimiento === "" ||
      codigoSeguridad === "" ||
      estado === "" ||
      municipio === "" ||
      domicilio === ""
    );
  }, [
    pedido,
    nombre,
    metodoPago,
    email,
    numeroTarjeta,
    fechaVencimiento,
    codigoSeguridad,
    estado,
    municipio,
    domicilio,
  ]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  const enviarFactura = () => {
    // Aquí puedes implementar la lógica para enviar la factura por correo electrónico
    console.log("Enviando factura a:", email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    colocarOrden();
    enviarFactura();
  };

  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_602fnvw', 'template_3b3w94m', e.target, '-5GalS2HJWoXminRr').then(res => {
      console.log(res);
    });
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <div className="flex">
        <div className="w-1/2">
          <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
          <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>

          <form onSubmit={enviarEmail}>
            <div>
              <label
                htmlFor="nombre"
                className="block uppercase text-slate-800 font-bold text-xl"
              >
                Nombre
              </label>

              <input
                id="nombre"
                type="text"
                className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="metodoPago"
                className="block uppercase text-slate-800 font-bold text-xl"
              >
                Método de Pago
              </label>

              <select
                id="metodoPago"
                className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="">Método de pago</option>
                <option value="tarjeta">Tarjeta de Crédito</option>
              </select>
            </div>

            {metodoPago === "tarjeta" && (
              <div>
                <div className="mt-5">
                  <label
                    htmlFor="numeroTarjeta"
                    className="block uppercase text-slate-800 font-bold text-xl"
                  >
                    Número de Tarjeta
                  </label>
                  <input
                    id="numeroTarjeta"
                    type="text"
                    className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="fechaVencimiento"
                    className="block uppercase text-slate-800 font-bold text-xl"
                  >
                    Fecha de Vencimiento
                  </label>

                  <input
                    id="fechaVencimiento"
                    type="date"
                    className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    value={fechaVencimiento}
                    onChange={(e) => setFechaVencimiento(e.target.value)}
                    min={getCurrentDate()}
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="codigoSeguridad"
                    className="block uppercase text-slate-800 font-bold text-xl"
                  >
                    Código de Seguridad
                  </label>

                  <input
                    id="codigoSeguridad"
                    type="text"
                    className="bg-gray-200 w-16 mt-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    value={codigoSeguridad}
                    onChange={(e) => {
                      const inputCode = e.target.value;
                      const numericCode = inputCode.replace(/\D/g, ""); // Eliminar caracteres no numéricos
                      const truncatedCode = numericCode.slice(0, 3); // Limitar a 3 dígitos
                      setCodigoSeguridad(truncatedCode);
                    }}
                    maxLength={3}
                  />
                </div>
              </div>
            )}

            <div className="mt-5">
              <label
                htmlFor="email"
                className="block uppercase text-slate-800 font-bold text-xl"
              >
                Correo Electrónico
              </label>

              <input
                id="email"
                type="email"
                className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-10">
              <p className="text-2xl">
                Total a pagar:{" "}
                <span className="font-bold">{formatearDinero(total)}</span>
              </p>
            </div>

            <div className="mt-5">
              <input
                type="submit"
                className={`${comprobarPedido()
                  ? "bg-indigo-100"
                  : "bg-indigo-600 hover:bg-indigo-800"
                  }  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                value="Pagar Pedido"
                disabled={comprobarPedido()}
              />
            </div>
          </form>
        </div>

        <div className="w-1/2 ml-10">
          <h1 className="text-4xl font-black">Datos de Domicilio</h1>
          <p className="text-2xl my-10">Ingresa tus datos de domicilio</p>

          <form>
            <div>
              <label
                htmlFor="estado"
                className="block uppercase text-slate-800 font-bold text-xl"
              >
                Estado
              </label>
              <select
                id="estado"
                className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                value={estado}
                onChange={handleEstadoChange}
              >
                <option value="Estado de México">Estado de México</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {estado === "Estado de México" ? (
              <>
                <div>
                  <label
                    htmlFor="municipio"
                    className="block uppercase text-slate-800 font-bold text-xl mt-4"
                  >
                    Municipio
                  </label>
                  <select
                    id="municipio"
                    className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                  >
                    <option value="">Selecciona un municipio</option>
                    {Municipios["Estado de México"].map((municipio) => (
                      <option key={municipio} value={municipio}>
                        {municipio}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="domicilio"
                    className="block uppercase text-slate-800 font-bold text-xl mt-4"
                  >
                    Domicilio completo
                  </label>
                  <input
                    type="text"
                    id="domicilio"
                    className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                    value={domicilio}
                    onChange={(e) => setDomicilio(e.target.value)}
                  />
                </div>
              </>
            ) : (
                <>

                  <div>
                  
                    <p style={{ color: "red" }}>Ohhh, ¡Pronto estaremos en tu estado!</p>
                  </div>

                </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Total;
