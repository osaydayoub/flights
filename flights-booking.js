// import { adminStatus as ad } from "./login.js"
const logoutButton = document.querySelector(".logout-button");
console.log(`logoutButton=${logoutButton}`)
let newObject = window.localStorage.getItem("userInformation");
console.log(JSON.parse(newObject));
const adminStatus = JSON.parse(newObject).admin;
logoutButton.addEventListener('click', function () {
    localStorage.clear();
    window.location.replace("./index.html");
})
const flights = [
    {
        id: 1,
        from: "Tel aviv",
        to: 'amsterdam',
        price: 40,
        dates: [
            { depart: new Date('2023.11.24') },
            { return: new Date('2023.12.1') }
        ]
    },
    {
        id: 2,
        from: "Tel aviv",
        to: 'london',
        price: 75,
        dates: [
            { depart: new Date('2023.11.28') },
            { return: new Date('2023.12.12') }
        ]
    },
    {
        id: 3,
        from: "Athens",
        to: 'Prague',
        price: 95,
        dates: [
            { depart: new Date('2023.11.28') },
            { return: new Date('2023.12.12') }
        ]
    },
    {
        id: 4,
        from: "Berlin",
        to: 'Prague',
        price: 22,
        dates: [
            { depart: new Date('2023.11.28') },
            { return: new Date('2023.12.12') }
        ]
    },
    {
        id: 5,
        from: "London",
        to: 'Berlin',
        price: 100,
        dates: [
            { depart: new Date('2023.11.28') },
            { return: new Date('2023.12.12') }
        ]
    }
];


let flightsCartArray = [];

let sorted = false;
const addFlightForm = document.getElementById("add-flight-form");
const updatePriceForm = document.getElementById("update-price-form");
const flightListContainer = document.getElementById("flight-list");
const flightsCart = document.getElementById("flight-Cart");
const flightsCartList = document.getElementById("flights-cart-List");
const cartButton = document.getElementById("MyCart-button");

if (adminStatus) {
    addFlightForm.style.display = "block";
    updatePriceForm.style.display = "block";
}

function showFlights(flights, element, c) {
    element.innerHTML = '';
    flights.forEach(flight => {
        const flightCard = document.createElement("div");
        flightCard.classList.add("flight");

        if(adminStatus){
            const idP = document.createElement("p");
            idP.textContent = `ID: ${flight.id}`;
            idP.classList.add("flight-info");
            flightCard.appendChild(idP);
        }
        const fromP = document.createElement("p");
        fromP.textContent = `From: ${flight.from}`;
        fromP.classList.add("flight-info");
        flightCard.appendChild(fromP);

        const toP = document.createElement("p");
        toP.textContent = `To: ${flight.to}`;
        toP.classList.add("flight-info");
        flightCard.appendChild(toP);

        const priceP = document.createElement("p");
        priceP.textContent = `Price: ${flight.price}`;
        priceP.classList.add("flight-info");
        flightCard.appendChild(priceP);

        const departP = document.createElement("p");
        const departObj = flight.dates[0].depart;
        departP.textContent = `Depart: ${departObj.getDate()}.${departObj.getMonth()}.${departObj.getFullYear()}`;
        departP.classList.add("flight-info");
        flightCard.appendChild(departP);

        const returnP = document.createElement("p");
        const returnObj = flight.dates[1].return;
        returnP.textContent = `Return: ${returnObj.getDate()}.${returnObj.getMonth()}.${returnObj.getFullYear()}`;
        returnP.classList.add("flight-info");
        flightCard.appendChild(returnP);

        if (c === 1) {

            const selectButton = document.createElement("button");
            selectButton.textContent = `Select`
            flightCard.appendChild(selectButton);

            selectButton.addEventListener('click', function () {
                if (!flightsCartArray.includes(flight)) {

                    flightsCartArray.push(flight);
                }
            });
        } else if (c === 2) {
            const inputLabl = document.createElement("label");
            inputLabl.for = "travelers-number"
            inputLabl.textContent = `Travelers Number:`

            const travelersNumberInput = document.createElement("input");
            travelersNumberInput.id = "travelers-number"
            travelersNumberInput.type = "number";
            if (flight.travelersNumber === undefined) {
                travelersNumberInput.value = "1";
                flight.travelersNumber = 1;
            } else {
                travelersNumberInput.value = flight.travelersNumber;
            }
            travelersNumberInput.min = "0";
            travelersNumberInput.required = "required";
            flightCard.appendChild(inputLabl);
            flightCard.appendChild(travelersNumberInput);


            travelersNumberInput.addEventListener("input", function (e) {
                flight.travelersNumber = travelersNumberInput.valueAsNumber;
            }
            );



            const removeButton = document.createElement("button");
            removeButton.textContent = `Remove`
            flightCard.appendChild(removeButton);

            removeButton.addEventListener('click', function () {
                if (flightsCartArray.includes(flight)) {
                    const index = flightsCartArray.indexOf(flight);
                    flightsCartArray.splice(index, 1);

                }
            });

        }

        element.appendChild(flightCard);
    });
}
showFlights(flights, flightListContainer, 1);

//search
const searchInput = document.getElementById("search-input");
const searchFlight = searchInput.addEventListener(
    "input",
    function (e) {
        filteredFlights = flights.filter((flight) =>
            flight.to.toLowerCase().includes(e.target.value.toLowerCase())
        );
        showFlights(filteredFlights, flightListContainer, 1);
    }
);

//sort by price
const sortByPrice = document.querySelector("#sort-by-price");
sortByPrice.addEventListener("click", () => {
    let sortedFlightsArray = flights.slice().sort((a, b) => {
        return b.price - a.price;
    });
    showFlights(sortedFlightsArray, flightListContainer, 1);
    sorted = true;
});


cartButton.addEventListener('click', function () {
    flightsCart.style.display = 'block';
    showFlights(flightsCartArray, flightsCartList, 2);
    console.log(flightsCartArray);
    console.log(flights);

})

const confirmationMessage = document.getElementById("confirmation-message");
const bookButton = document.getElementById("book-button")
bookButton.addEventListener('click', function () {
    let totalPrice = 0;
    flightsCartArray.forEach(flight => {
        totalPrice += flight.price * flight.travelersNumber;
    })
    confirmationMessage.innerText = `Your flights booked successfully the total price is ${totalPrice}`;
})

// add new flight
addFlightForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const price = document.getElementById("price").valueAsNumber;
    const departDate = document.getElementById("depart").value;
    const returnDate = document.getElementById("return").value;
    const newFlight = {
        id: flights.length + 1,
        from,
        to,
        price,
        dates: [
            { depart: new Date(departDate) },
            { return: new Date(returnDate) }
        ]
    }
    flights.push(newFlight);
    console.log(flights);
    showFlights(flights, flightListContainer, 1);
    addFlightForm.reset();
})

//updatePriceForm

updatePriceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const flightId = document.getElementById("flight-id").valueAsNumber;
    const newPrice = document.getElementById("new-price").valueAsNumber;
   
    flights.forEach(flight=>{
        if(flight.id===flightId){
            flight.price=newPrice;
        }
    })

    
    
    showFlights(flights, flightListContainer, 1);
    updatePriceForm.reset();
})