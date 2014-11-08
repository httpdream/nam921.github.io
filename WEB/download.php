<meta charset="utf-8">
<?php
include "db_info.php";
mysql_query('charset utf-8');
$query = "select* from board where idx=$_GET[id]";
$result = mysql_query($query);
$row = mysql_fetch_row($result);
$dir = './files/';
    $filehash = $row[5];
$filename= $row[6];

if($filehash){
    echo $filehash;
    if(file_exists($dir.$filehash)){
            header("Content-Type: Application/octet-stream");
            header("Content-Disposition: attachment; filename=".$filename);
            header("Content-Transfer-Encoding: binary");
            header("Content-Length: ".filesize($dir.$filehash));
 
            $fp = fopen($dir.$row[5], "rb");
            while(!feof($fp))
            {
                echo fread($fp, 1024);
            }
            fclose($fp);
            
            
    }
}
else echo '파일없내';
?>