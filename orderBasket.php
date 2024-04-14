<?php
$mysqli = new mysqli("localhost", "root", "08mari04m", "zdorovianadoloni");

if ($mysqli->connect_errno) {
    echo "Не вдалося підключитися до MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$product_name = $_POST['product_name'];
$product_descr = $_POST['product_descr'];
$product_quantity = $_POST['product_quantity'];
$total_price = $_POST['total_price'];
$user_name = $_POST['user_name'];
$user_phone = $_POST['user_phone'];
$region = $_POST['region'];
$city = $_POST['city'];
$office = $_POST['office'];

$sql = "INSERT INTO orders (product_name, product_descr, product_quantity, total_price, user_name, user_phone, region, city, office) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

if ($stmt = $mysqli->prepare($sql)) {
    $stmt->bind_param("sssdssss", $product_name, $product_descr, $product_quantity, $total_price, $user_name, $user_phone, $region, $city, $office);
    $stmt->execute();
    $stmt->close();
} else {
    echo "Помилка підготовки SQL: (" . $mysqli->errno . ") " . $mysqli->error;
}

$mysqli->close();
?>