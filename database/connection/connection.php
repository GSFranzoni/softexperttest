<?php

use Doctrine\DBAL\DriverManager;

return DriverManager::getConnection([
    'dbname' => getenv('MYSQL_DATABASE'),
    'user' => getenv('MYSQL_USER'),
    'password' => getenv('MYSQL_PASSWORD'),
    'host' => getenv('MYSQL_HOST'),
    'driver' => 'pdo_mysql'
]);