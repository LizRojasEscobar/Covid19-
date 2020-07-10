<?php

class db {
  private $dbHost ='127.0.0.1';
  private $dbUser ='root';
  private $dbPass = '';
  private $dbName = 'covid19db';
  function connectDB()
  {
    $mySqlConnect = "mysql:host=$this->dbHost;dbname=$this->dbName";
    $dbConnect = new PDO($mySqlConnect, $this->dbUser, $this->dbPass);
    $dbConnect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnect;
  }
}
