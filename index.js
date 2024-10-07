const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const list = document.getElementById("list");
const searchInput = document.getElementById("search");
const onFormSubmit = document.getElementById("add");
const selected = document.getElementById("selected");
let isEditSelected = "";

onFormSubmit.addEventListener("submit", onForSubmitHandler);
searchInput.addEventListener("input", onSearchHandler);

function onForSubmitHandler(e) {
    e.preventDefault();
    const nameValue = name.value;
    const emailValue = email.value;
    const phoneValue = phone.value;

    if (!nameValue || !emailValue || !phoneValue) {
        alert("All fields are required");
        return;
    }

    if (isEditSelected) {
        const prevData = JSON.parse(localStorage.getItem("user")) || [];
        const newData = prevData.map((item) => {
            if (item.id === isEditSelected) {
                return {
                    ...item,
                    name: nameValue,
                    email: emailValue,
                    phone: phoneValue
                }
            }
            return item;
        })
        localStorage.setItem("user", JSON.stringify(newData));
        name.value = "";
        email.value = "";
        phone.value = "";
        isEditSelected = "";
        displayData(newData);
        return;
    }
    const userDetails = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        id: Math.random().toString(),
    }
    const prevData = JSON.parse(localStorage.getItem("user")) || [];

    localStorage.setItem("user", JSON.stringify([...prevData, userDetails]));
    name.value = "";
    email.value = "";
    phone.value = "";
    const data = JSON.parse(localStorage.getItem("user")) || [];
    displayData(data);
}

function displayData(data) {
    list.innerHTML = "";
    data.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.email} - ${item.phone}`;
        const removeBtn = document.createElement('button');
        const editbtn = document.createElement('button');

        removeBtn.onclick = () => onRemoveHandler(item.id);
        editbtn.onclick = () => onEditHandler(item);

        removeBtn.innerText = "Remove";
        editbtn.innerText = "Edit";
        li.appendChild(removeBtn);
        li.appendChild(editbtn)
        list.appendChild(li);
    })
}

function onRemoveHandler(id) {
    const prevData = JSON.parse(localStorage.getItem("user")) || [];
    const newData = prevData.filter((user) => user.id !== id);
    localStorage.setItem("user", JSON.stringify(newData));
    displayData(newData);
}

function onEditHandler(item) {
    name.value = item.name;
    email.value = item.email;
    phone.value = item.phone;
    isEditSelected = item.id;
}

function onSearchHandler(e) {
    const searchValue = e.target.value;
    const data = JSON.parse(localStorage.getItem("user")) || [];
    if (selected.value === "") {
        searchInput.value = "";
        alert("Please select an option");
        return;
    }
    else {
        if (selected.value === "name") {
            console.log("anme" + searchValue)
            const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
            displayData(filteredData);
        }
        else if (selected.value === "email") {
            console.log("anme" + searchValue)
            const filteredData = data.filter((item) => item.email.toLowerCase().includes(searchValue.toLowerCase()));
            displayData(filteredData);
        }
        else if (selected.value === "phone") {
            console.log("anme" + searchValue)
            const filteredData = data.filter((item) => item.phone.includes(searchValue));
            displayData(filteredData);
        }
    }
}



displayData(JSON.parse(localStorage.getItem(("user"))) || []);