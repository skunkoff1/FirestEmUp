<?php

$host_name = 'localhost:3306';
$database = 'firstemup';
$user_name = 'root';
$password = '';
$dbh = null;

try {
  $db = new PDO("mysql:host=$host_name; dbname=$database;", $user_name, $password);
} catch (PDOException $e) {
  echo "Erreur!: " . $e->getMessage() . "<br/>";
  die();
}