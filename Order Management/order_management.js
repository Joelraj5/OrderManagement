document.addEventListener("DOMContentLoaded", function () {
    fetchOrders();

    document.getElementById("orderForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let id = document.getElementById("orderId").value;
        let customerName = document.getElementById("customerName").value;
        let orderItem = document.getElementById("orderItem").value;
        let action = id ? "update" : "create";

        fetch("OrderServlet", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=${action}&id=${id}&customerName=${customerName}&orderItem=${orderItem}`
        }).then(() => {
            fetchOrders();
            document.getElementById("orderForm").reset();
        });
    });
});

function fetchOrders() {
    fetch("OrderServlet").then(response => response.json()).then(data => {
        let tbody = document.getElementById("orderTableBody");
        tbody.innerHTML = "";
        data.forEach(order => {
            let row = `<tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.orderItem}</td>
                <td>
                    <button onclick="editOrder(${order.id}, '${order.customerName}', '${order.orderItem}')">Edit</button>
                    <button onclick="deleteOrder(${order.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    });
}

function editOrder(id, customerName, orderItem) {
    document.getElementById("orderId").value = id;
    document.getElementById("customerName").value = customerName;
    document.getElementById("orderItem").value = orderItem;
}

function deleteOrder(id) {
    fetch("OrderServlet", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=delete&id=${id}`
    }).then(() => fetchOrders());
}
