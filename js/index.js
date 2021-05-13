//Benjamin Moraga R. - Programacion Orientada a la Web - USM 2021

tinymce.init({
    selector: '#descripcion-textarea',
    height: 250,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });


let menu = [];

document.addEventListener("DOMContentLoaded", ()=>{


    let horSelect =  document.querySelector("#select-horario");

    let desayunoOpt = document.createElement("option");
    desayunoOpt.innerText = "Desayuno";
    desayunoOpt.value = "desayuno";
    let almuerzoOpt = document.createElement("option");
    almuerzoOpt.innerText = "Almuerzo";
    almuerzoOpt.value = "almuerzo";
    let onceOpt = document.createElement("option");
    onceOpt.innerText = "Once";
    onceOpt.value = "once";
    let cenaOpt = document.createElement("option");
    cenaOpt.innerText = "Cena";
    cenaOpt.value = "cena"

    horSelect.appendChild(desayunoOpt);
    horSelect.appendChild(almuerzoOpt);
    horSelect.appendChild(onceOpt);
    horSelect.appendChild(cenaOpt);

});

document.querySelector("#btn-registrar").addEventListener("click", ()=>{


    let nombre = document.querySelector("#nom-input").value;
    let horario = document.querySelector("#select-horario").value;
    let valor = document.querySelector("#valor-input").value;
    let descripcion = tinymce.get("descripcion-textarea").getContent();

    let valor_aprobado = false;

    switch(horario){

        case "desayuno":
            if(valor >= 1000 && valor <= 10000){
                valor_aprobado = true
            }
            break;
        
        case "almuerzo":
            if(valor >= 10000 && valor <= 20000){

                valor_aprobado = true;
            }
            break;
        
        case "once":
            if(valor >= 5000 && valor <= 15000){

                valor_aprobado = true;
            }
            break;

        case "cena":
            if(valor >= 15000){

                valor_aprobado = true
            }
            break;
    }

    if (nombre != "" && valor_aprobado) {

        let plato = {};

        plato.nombre = nombre;
        plato.horario = horario;
        plato.valor = valor;
        plato.descripcion = descripcion;
        plato.oferta = false;

        switch(horario){

            case "desayuno":
                if(valor < 5000){
                    plato.oferta = true;
                }
                break;
            
            case "almuerzo":
                if(valor < 15000){
    
                    plato.oferta = true;
                }
                break;
            
            case "once":
                if(valor < 10000){
    
                    plato.oferta = true;
                }
                break;
    
            case "cena":
                if(valor < 20000){
    
                    plato.oferta = true;
                }
                break;

            default:
                plato.oferta = false;
                break;
        }
        
        
        menu.push(plato);
        recargarMenu();
        Swal.fire("Registro de Menu Realizado!", `El plato llamado ${nombre} ha sido agregado satisfactoriamente al menu del restaurant.`, "success");

    }else{

        if(nombre==""){

            Swal.fire("Error!", "El plato debe tener un nombre!", "error")
        }else if (!valor_aprobado){

            switch(horario){

                case "desayuno":
                    Swal.fire("Error!", "El desayuno debe tener un precio entre $1000 y $10000 pesos!", "error");
                    break;
                
                case "almuerzo":
                    Swal.fire("Error!", "El almuerzo debe tener un precio entre $10000 y $20000 pesos!", "error");
                    break;
                
                case "once":
                    Swal.fire("Error!", "Las onces debe tener un precio entre $5000 y $15000 pesos!", "error");
                    break;

                case "cena":
                    Swal.fire("Error!", "La cena debe tener un precio sobre los $15000 pesos!", "error");
                    break;
            }
        }
    }
});

const recargarMenu = ()=>{

    let tbody = document.querySelector("#tb-body");
    tbody.innerHTML = "";

    for(let i = 0; i < menu.length; ++i){

        let plato = menu[i];

        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        tdNombre.innerText = plato.nombre;
        let tdHorario = document.createElement("td");
        tdHorario.innerText = plato.horario.charAt(0).toUpperCase()+plato.horario.slice(1);
        let tdValor = document.createElement("td");
        tdValor.innerText = "$"+plato.valor;
        let tdDescripcion = document.createElement("td");
        tdDescripcion.innerHTML = plato.descripcion;
        let tdOferta = document.createElement("td");
        let icono = document.createElement("i");
        if (plato.oferta){

            icono.classList.add("fa", "fa-star", "text-warning");

        }else{

            icono.classList.add("fa", "fa-minus-circle", "text-danger")
        }

        tdOferta.appendChild(icono);
        tr.appendChild(tdNombre);
        tr.appendChild(tdHorario);
        tr.appendChild(tdValor);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdOferta);

        tbody.appendChild(tr);
    }

};