const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#get-rate");
const fromCurr = document.querySelector("select[name='from']");
const toCurr = document.querySelector("select[name='To']"); 
const msg = document.querySelector(".msg");
const amount = document.querySelector("#amount-input");

// Populate dropdowns
for (let select of dropdowns) {
    for (let codes in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = codes;
        newOption.value = codes;

        if (select.name === "from" && codes === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && codes === "INR") {
            newOption.selected = "selected";
        }

        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    });
}

// Update flag when dropdown changes
const changeFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Exchange rate logic
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        let finalAmt = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Something went wrong!";
    }
});
