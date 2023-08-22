let form = document.querySelector(".add-items");
let list_of_plates = document.querySelector(".plates");

let plates = JSON.parse(localStorage.getItem("plates")) || [];

// the handling process listener

function handlePlates(e) {
  e.preventDefault();
  let order = this.querySelector(`[name="item"]`).value;

  let plate = {
    order,
    done: false,
  };

  plates.push(plate);

  addPlate(plates, list_of_plates);

  localStorage.setItem("plates",JSON.stringify(plates))

  this.reset();
}

function addPlate(plates_arr = [], ul) {
  ul.innerHTML = plates_arr
    .map((each, i) => {
      return `
            <li >
            <input type="checkbox" id="data-${i}" data-index="${i}" ${
        each.done ? "checked" : ""
      }  />
            <label for="data-${i}" >${each.order}</label>
            </li>
            `;
    })
    .join("");
}

function checkDONE(ev) {
  if(!ev.target.matches("input")) return;

  let label = ev.target.dataset.index
  plates[label].done = !plates[label].done

  localStorage.setItem("plates",JSON.stringify(plates))
  addPlate(plates,list_of_plates)
}


form.addEventListener("submit", handlePlates);
list_of_plates.addEventListener("click", checkDONE);
addPlate(plates,list_of_plates)

