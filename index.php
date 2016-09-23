<?php
    $filesObj = json_decode(file_get_contents("files.json"));
    function getLatestVersion($filename) {
        global $filesObj;
        echo end($filesObj->$filename);
    }
    getLatestVersion("test.js");

?>
<!--<html>
    <script src=""></script>
</html>-->