// esta programa tiene por funcion registrar una reserva para el hostel. La reserva se guarda en una lista. Mediante el uso de algun sistema de back end, en un futuro la idea es enviar al calendaria los dias disponibles, segun reservas hechas con anterioridad. Y esta informacion se enviaria al back medinte el boton ENVIAR(que esta a la derecha de la pantalla), para su registro en el backend. En entregas anteriores lo que hacia era comparar reservas, simulandolas mediante el uso de Json, pero con el nuevo formato de datos, se me hizo imposible comparar la reseerva actual con las reservas mediante json, para entregarlas en esta fecha. Pido mil disculpas por no poder llegar a integrar esa funcion
// Tampoco incorpore api a la entrega final, porque no encontre una que fuera util a mi proyecto. Intente con la api de Mercado pago, pero tampoco pude integrarla correctamente para esta fecha!! =(

// mediante esta funcion, hago aparecer el modal de las fechas
function ver() {
  $("#modal-date").modal();
}

// mediante esta funcion, le doy diferente colores y fondos a los casilleron completos
function cambiaColor() {
  $("#nombre, #tipoHabit, #cantPers").mouseleave(function () {
    jQuery(this).css("background-color", "lightgrey");
    jQuery(this).css("color", "red");
  });
}

// esta funcion muestra las fechas seleccionadas con checkin y checkout
function muestraFechas(){

    var var1 = $("#var1").val();
    var var2 = $("#var2").val();
  
    document.getElementById("datosIn").innerHTML = "Tu fecha de LLEGADA es: "+var1;
    document.getElementById("datosOut").innerHTML = "Tu fecha de PARTIDA es: "+var2;
    
}




// esta funcion visualiza el valor de cada habitacion
function precioHabit() {
  var habit = $("#tipoHabit").val();

  switch (habit) {
    case "Privada":
      $("#valor").show();
      document.getElementById("precio").innerHTML = "$ 2.500, final.";
      $("#personasA").show();
      $("#personasB, #personasC").hide();
      break;
    case "Compartida - Chica":
      $("#valor").show();
      document.getElementById("precio").innerHTML = "$ 1.500 p/persona.";
      $("#personasB").show();
      $("#personasA, #personasC").hide();
      break;
    case "Compartida - Grande":
      $("#valor").show();
      document.getElementById("precio").innerHTML = "$ 1.200 p/persona.";
      $("#personasC").show();
      $("#personasA, #personasB").hide();
      break;
      case "X":
      document.getElementById("precio").innerHTML =
        "No elegiste una habitacion, vuelve a intentarlo!!";
      break;
  }
}



// esta funcion calcula el precio de la reserva hecha
function calculaPrecio() {
  localStorage.tipoHabit = document.getElementById("tipoHabit").value;
  localStorage.cantPers = document.getElementById("cantPers").value;
  localStorage.checkIn = document.getElementById("var1").value;
  localStorage.checkOut = document.getElementById("var2").value;

  var room = localStorage.tipoHabit;
  var cantPers = localStorage.cantPers;
  var checkIn = localStorage.checkIn
  var checkOut = localStorage.checkOut

  
  var noches = calculaNoches(checkIn, checkOut)

  var precio = 0;


  switch (room) {
    case "Privada":
      precio = cantPers * noches * 2200;
      $("#Pagar").show();
      document.getElementById("precioTotal").innerHTML = "El precio de tu estadia sería de $ " + precio;

      break;
    case "Compartida - Chica":
      precio = cantPers * noches * 1500;
      $("#Pagar").show();
      document.getElementById("precioTotal").innerHTML = "El precio de tu estadia sería de $ " + precio;

      break;
    case "Compartida - Grande":
      precio = cantPers * noches * 1200;
      
      document.getElementById("precioTotal").innerHTML = "El precio de tu estadia sería de $ " + precio;
      break;
  }
}


// esta funcion resta las fechas de entrada y salida, para obtener las noches del cliente, y pasar esa info para calcular el valor de la reserva
function calculaNoches(checkIn, checkOut){

    ms = Date.parse(checkIn);
    fecha1 = new Date(ms);
  
    ms2 = Date.parse(checkOut);
    fecha2 = new Date(ms2);
  
    var resta = fecha2 - fecha1;
    var noches = resta / 1000 / 60 / 60 / 24; 
  
    return noches;
}








// esta funcion crea la reserva y guarda los datos en la lista de reservas, y los imprime en consola

function guardarDatos() {
  debugger
  localStorage.nombre = document.getElementById("nombre").value;
  localStorage.var1 = document.getElementById("var1").value;
  localStorage.var2 = document.getElementById("var2").value;
  localStorage.tipoHabit = document.getElementById("tipoHabit").value;
  localStorage.cantPers = document.getElementById("cantPers").value;

  var nombre = localStorage.nombre;
  var checkIn = localStorage.var1;
  var checkOut = localStorage.var2;
  var room = localStorage.tipoHabit;
  var cantPers = localStorage.cantPers

  var reserva02 = CreaReserva(nombre, room, cantPers, checkIn, checkOut);

  console.log(nombre)
  console.log(room)
  console.log(cantPers)
  console.log(checkIn)
  console.log(checkOut)

  
}


var listaReserva = [];


// crea objeto reserva

function ReservaCliente(nombre, room, cantPers, checkIn, checkOut) {
  this.nombre = nombre;
  this.room = room;
  this.checkIn = checkIn;
  this.checkOut = checkOut;
  this.cantPers = cantPers;
  this.precio = 0;

  this.getPrecio = () => this.precio;
  this.setPrecio = (precio) => (this.precio = precio);
}


// crea reserva, registra en lista y muestra los datos en el html

function CreaReserva(nombre, room, cantPers, checkIn, checkOut) {
  let nuevaReserva = new ReservaCliente();

  nuevaReserva.nombre = nombre;
  nuevaReserva.room = room;
  nuevaReserva.cantPers = cantPers;
  nuevaReserva.checkIn = checkIn;
  nuevaReserva.checkOut = checkOut;

  registraReserva(nuevaReserva)
  muestraReserva(nuevaReserva)
}

// envia los datos de reserva a lista

function registraReserva(reserva) {
  listaReserva.push(reserva);
}


// mustra los datos en el html

function muestraReserva(reserva) {

  $("#datosReserva").show()
  document.getElementById("reserva").innerHTML =
    "Nombre: " +
    reserva.nombre +
    " - Tipo de Habitacion: " +
    reserva.room +
    " - Cantidad de Personas: " +
    reserva.cantPers +
    " - CheckIn: " +
    reserva.checkIn +
    " - CheckOut: " +
    reserva.checkOut;
}

