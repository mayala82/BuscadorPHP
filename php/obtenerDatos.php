<?php
      $file = file_get_contents('../datos/data-1.json');
      $data = json_decode($file);
      echo json_encode($data);    
?>