
function toggleSidebar() {
    const sidebar = document.querySelector('.sideBar');

    sidebar.classList.toggle('active');
}


function openInsertModal() {
    document.getElementById("insertModal").style.display = "block";
}

function openCashModal(data) {
    document.getElementById("cashModal").style.display = "block";

    const itemId = data?.getAttribute('data-id');
    const genderVal = data?.getAttribute('data-gender');
    const birthdayVal = data?.getAttribute('data-birthday');
    const usernameVal = data?.getAttribute('data-username');
    const msisdnVal = data?.getAttribute('data-msisdn');
    const emailVal = data?.getAttribute('data-email');

    console.log("Open cash modal", itemId, genderVal, birthdayVal, usernameVal, msisdnVal, emailVal);


    $("#sniperId").text(itemId);
    $("#genderVal").text(genderVal);
    $("#birthdayVal").text(birthdayVal);
    $("#usernameVal").text(usernameVal);
    $("#msisdnVal").text(msisdnVal);
    $("#emailVal").text(emailVal);


}

function closeCashModal() {
    document.getElementById("cashModal").style.display = "none";
}

function closeInsertModal() {
    document.getElementById("insertModal").style.display = "none";
}

function closeDetailsModal() {
    document.getElementById("detailsModal").style.display = "none";
}

function openUpdateModal(data) {

    document.getElementById("updateModal").style.display = "block";

    const itemId = data?.getAttribute('data-id');
    const genderVal = data?.getAttribute('data-gender');
    const birthdayVal = data?.getAttribute('data-birthday');

    // Your logic to open the update modal using the itemId
    console.log("Edit Item ID:", itemId);
    console.log("Edit Item Gender:", genderVal);
    console.log("Edit Item Birthday:", birthdayVal);

    document.getElementById("sniperIdUpdate").value = itemId;
    document.getElementById("genderUpdate").value = genderVal;
    document.getElementById("birthdayUpdate").value = birthdayVal;


}

function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}



$(document).ready(function() {
    const loadItems = () => {
        $.ajax({
            url: "/api/v1/Sniper/getAll",
            type: "GET",
            contentType: "application/json",
            success: function(response) {

                var id =response[1]?.id

                // Check if the data array has elements
                if (response && response.length >= 0) {
                    $(".id").text(response.id);
                    $(".username").text(response.username);
                    $(".msisdn").text(response.msisdn);
                    $(".gender").text(response.gender);
                    $(".birthday").text(response.birthday);
                    $(".email").text(response.email);


console.log("THE ID IS:", id)

        $.ajax({
            url: `/api/v1/Cash/getSniperCash/${id}`,
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                // Check if the data array has elements
                if (response && response.length >= 0) {

                    $("#cash").text(response.cash);
                }
                }})



                    const itemCardFunc = (response) => {
                        let cardContainer = $(".mainCards");
                        cardContainer.empty();

                        if (response.length !== 0) {
                            response.forEach(items => {
                                const { username, msisdn, id, gender,birthday,email, } = items;
                                const card = `
<ul class="cards">
  <li>
    <a class="card">
      <img src="https://i.imgur.com/2DhmtJ4.jpg" class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
          <img class="card__thumb" src="/img/userImage.jpg" alt="" />
          <div class="card__header-text">
            <h3 class="card__title">${username},<span class="gst"> ${gender}</span></h3>
            <span class="card__status">${email}</span>
          </div>
        </div>
        <p class="card__description">Date of Birth : ${birthday}</p>
         <p class="card__description">Money: <p id="cash"></p></p>
           <button class="btn-sm" data-id="${id}" data-gender="${gender}" data-birthday="${birthday}" onclick="openUpdateModal(this)">Edit Item</button>
           <button class="btn-sm" data-id="${id}" onclick="deleteItem(this)">Delete Item</button>
           <button id="detailsBtn" class="btn-sm" data-id="${id}" data-email="${email}" data-msisdn="${msisdn}" data-username="${username}" data-birthday="${birthday}" data-gender="${gender}" onclick="getItemDetails(this)">Item Details</button>
           <button class="btn-sm" data-id="${id}" data-email="${email}" data-msisdn="${msisdn}" data-username="${username}" data-birthday="${birthday}" data-gender="${gender}" onclick="openCashModal(this)">Add Cash</button>
      </div>
    </a>
  </li>
</ul>
                                `;

                                // Append each card to the container
                                cardContainer.append(card);
                            });
                        } else {
                            cardContainer.html('<p>NO ITEMS AVAILABLE FOR THIS PAGE</p>');
                        }
                    };

                    itemCardFunc(response);
                } else {
                    // Handle the case when there are no items in the response
                    console.error("No items found in the response.");
                }
            },
            error: function(error) {
                // Handle the error more gracefully
                console.error("AJAX request failed:", error);
            }
        });
    };

    // Call the Main Page function after it's defined
    loadItems();

    const loadTable = () => {
        $.ajax({
            url: "/api/v1/Sniper/getAll",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                // Check if the data array has elements
                if (response && response.length >= 0) {
                    $(".id").text(response.id);
                    $(".username").text(response.username);
                    $(".msisdn").text(response.msisdn);
                    $(".gender").text(response.gender);
                    $(".birthday").text(response.birthday);
                    $(".email").text(response.email);

                    const itemCardFunc = (data) => {
                        let tableContainer = $(".mainTables");
                        tableContainer.empty();

                        if (data.length !== 0) {
                            // Define the table head outside of the loop
                            const tableHead = `
            <table class="container">
                <thead>
                    <tr>
                        <th >Username</th>
                        <th >MSISDN</th>
                        <th >Gender</th>
                        <th >Date of Birth</th>
                        <th >E-mail</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

                            // Append table head to the container
                            tableContainer.append(tableHead);

                            data.forEach(tables => {
                                const { username, msisdn, id, gender, birthday, email } = tables;
                                const tableRow = `
                <tr>
                    <td>${username}</td>
                    <td>${msisdn}</td>
                    <td>${gender}</td>
                    <td>${birthday}</td>
                    <td>${email}</td>
                    <td>
                        <button class="btn" data-id="${id}" data-gender="${gender}" data-birthday="${birthday}" onclick="openUpdateModal(this)">Edit Item</button>
                        <button class="btn" data-id="${id}" data-username="${username}" onclick="deleteItem(this)">Delete Item</button>
                        <button class="btn" id="detailsBtn" data-id="${id}" data-email="${email}" data-msisdn="${msisdn}" data-username="${username}" data-birthday="${birthday}" data-gender="${gender}" onclick="getItemDetails(this)">Item Details</button>
                        <button class="btn" data-id="${id}" data-email="${email}" data-msisdn="${msisdn}" data-username="${username}" data-birthday="${birthday}" data-gender="${gender}" onclick="openCashModal(this)">Add Cash</button>
                    </td>
                </tr>
            `;

                                // Append each row to the container
                                tableContainer.append(tableRow);
                            });

                            // Close the table body and table tag
                            tableContainer.append('</tbody></table>');
                        } else {
                            tableContainer.html('<p>NO ITEMS AVAILABLE FOR THIS PAGE</p>');
                        }
                    };

                    itemCardFunc(response);
                } else {
                    // Handle the case when there are no items in the response
                    console.error("No items found in the response.");
                }
            },
            error: function(error) {
                // Handle the error more gracefully
                console.error("AJAX request failed:", error);
            }
        });
    };
    loadTable()

});



function addSniper() {
    let id = $("#insertId").val()
    let username = $('#username').val()
    let msisdn = $('#msisdn').val()
    let gender = $('#gender').val()
    let birthday = $('#birthday').val()
    let email = $('#email').val()

    let insertData = {
        "id": id,
        "username": username,
        "msisdn": msisdn,
        "gender": gender,
        "birthday": birthday,
        "email": email
    }

    console.log("Not YET success", insertData);


    $.ajax({
        url: "/api/v1/Sniper/addSniper",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(insertData),
        success: function (insertData) {
            console.log("ggg success", insertData);

            alert("Item Added successfully");
            location.reload();
        },
        error: function (error) {
            console.log("Error updating item: ", error);
            // Additional error handling if needed
            console.log("ggg error", insertData);

        }
    });
}

$("#addSniper").on("click", addSniper);

function sendCash() {
    let cash = $('#cash').val()
    let month = $('#month').val()
    let sniperId = $("#sniperId").text()

    let cashId = $('#cashId').val()



    let cashData = {
        "id": cashId,
        "sniperId": sniperId,
        "cash": cash,
        "month": month,
    }

    console.log("Not YET successfully added cash", cashData);


    $.ajax({
        url: `/api/v1/Cash/sendCash`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(cashData),
        success: function (cashData) {
            console.log("ggg success", cashData);

            alert("cashData Added successfully");
            location.reload();
        },
        error: function (error) {
            console.log("Error adding cash: ", error);
            // Additional error handling if needed
            console.log("ggg error", cashData);

        }
    });
}

$("#sendCash").on("click", sendCash);


function updateItem() {


    // Get form data
    let formData = {
        id: $("#sniperIdUpdate").val(),
        birthday: $("#birthdayUpdate").val(),
        gender: $("#genderUpdate").val(),
        username: $("#usernameUpdate").val(),
        msisdn: $("#msisdnUpdate").val(),
        email: $("#emailUpdate").val(),
    };



    // Make AJAX call
    $.ajax({
        type: "PUT",
        url: `/api/v1/Sniper/update`,
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (formData) {
            console.log("ggg success", formData);

            alert("Update successful");
            location.reload();
        },
        error: function (error) {
            console.log("Error updating item: ", error);
            // Additional error handling if needed
            console.log("ggg error", formData);

        }
    });
}


function getItemDetails(detailsData) {

//get

    document.getElementById("detailsModal").style.display = "block";

    const itemId = detailsData?.getAttribute('data-id');
    const genderVal = detailsData?.getAttribute('data-gender');
    const birthdayVal = detailsData?.getAttribute('data-birthday');
    const usernameVal = detailsData?.getAttribute('data-username');
    const msisdnVal = detailsData?.getAttribute('data-msisdn');
    const emailVal = detailsData?.getAttribute('data-email');

    console.log("Edit Sniper Details:", itemId, genderVal, birthdayVal, usernameVal, msisdnVal, emailVal);

    document.getElementById("sniperIdDetails").textContent = itemId;
    document.getElementById("genderDetails").textContent = genderVal;
    document.getElementById("birthdayDetails").textContent = birthdayVal;
    document.getElementById("usernameDetails").textContent = usernameVal;
    document.getElementById("msisdnDetails").textContent = msisdnVal;
    document.getElementById("emailDetails").textContent = emailVal;


}



function deleteItem(deleteData){

    console.log("Delete Not Yet successfull");
    const itemId = deleteData.getAttribute('data-id');
    const userName = deleteData.getAttribute('data-username');

    // Your logic to delete the item using the itemId
    console.log("Delete Item ID:", itemId, "and username", userName);


    $.ajax({
        url: `/api/v1/Sniper/delete/${itemId}`,
        type: "DELETE",
        contentType: "application/json",
        success: function (response) {
            console.log("Delete successful", response);

            alert("Delete successful");
            location.reload();
        },
        error: function (error) {
            console.log("Error deleting item: ", error);

        }
    });}
