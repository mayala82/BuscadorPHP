<?php
      $file = file_get_contents('../datos/data-1.json');
      $data = json_decode($file);
      $ciudadesArray = array();
      $tiposArray = array();
      foreach($data as $key => $value){
           array_push($ciudadesArray, $value -> Ciudad);
           array_push($tiposArray, $value -> Tipo);
      }
      $ciudades = array_unique($ciudadesArray);
      $tipos = array_unique($tiposArray);
      $newData = array('ciudades' => $ciudades, 'tipos' => $tipos);
      echo json_encode($newData);    
?>
