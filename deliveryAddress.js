document.addEventListener("DOMContentLoaded", function() {
    let deliveryDetails = document.getElementById("delivery-details");
    let btnCancel = document.getElementById("btn_cancel");
    deliveryDetails.style.display = "block";
    btnCancel.addEventListener("click", function() {
        window.location.href = "orderBasket.html";
    });

    let saveDataButton = document.getElementById("btn_save");
    saveDataButton.addEventListener("click", function() {
        let deliveryData = {
            region: document.getElementById("region-input").value,
            city: document.getElementById("city-input").value,
            office: document.getElementById("office-input").value,
            name: document.getElementById("name-input").value,
            phone: document.getElementById("phone-input").value
        };
        localStorage.setItem('deliveryData', JSON.stringify(deliveryData));
        window.location.href = "orderBasket.html";
    });

    let savedDeliveryData = JSON.parse(localStorage.getItem('deliveryData'));
    if (savedDeliveryData) {
        document.getElementById("region-input").value = savedDeliveryData.region;
        document.getElementById("city-input").value = savedDeliveryData.city;
        document.getElementById("office-input").value = savedDeliveryData.office;
        document.getElementById("name-input").value = savedDeliveryData.name;
        document.getElementById("phone-input").value = savedDeliveryData.phone;
    }
});
