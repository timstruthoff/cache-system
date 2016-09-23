<?php

function randStrGen($len){
        $result = "";
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $charArray = str_split($chars);
        for($i = 0; $i < $len; $i++){
            $randItem = array_rand($charArray);
            $result .= "".$charArray[$randItem];
        }
        return $result;
}

$sqlConnectString = "mysql:host=localhost:3306;dbname=assets";
$sqlTable = "assets";
$sqlUser = "root";
$sqlPass = "12345";

$id = randStrGen(6);
$name 
    
$sth = $dbh->query("SELECT COUNT(1) FROM " . $sqlTable . " WHERE name = '" . $name. "'");
$result = $sth->fetchall();

$exists = $result[0][0];

if ($exists == 1) {
    echo "Asset already exists; updating";
    $dbh = new PDO($sqlConnectString, $sqlUser, $sqlPass); 
    $sth = $dbh->query("UPDATE " . $sqlTable . " SET title='" . $title . "', source='" . $source . "' WHERE path='" . $path . "';");
    echo "Path updated<br>";
}

$dbh = new PDO($sqlConnectString, $sqlUser, $sqlPass);
$sth = $dbh->query("INSERT INTO assets (id, name, source, hash, timestamp) VALUES ('" . $id . "', '" . $path . "', '" . $title . "', '" . $source . "')");
?>