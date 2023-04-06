<?php

namespace App\Persistence\EntityManager;

use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\ORMSetup;
use Doctrine\ORM\Tools\Setup;

class EntityManagerFactory
{
    /**
     * @var ?EntityManager
     */
    private static ?EntityManager $entityManager = null;

    /**
     * @return EntityManager
     * @throws ORMException
     * @throws Exception
     */
    public static function getEntityManager(): EntityManager
    {
        if (self::$entityManager !== null) {
            return self::$entityManager;
        }

        $entityDir = __DIR__ . "/Entity";

        $connection = require_once __DIR__ . "/../../../database/connection/connection.php";

        $config = ORMSetup::createAttributeMetadataConfiguration([$entityDir], true);

        return self::$entityManager = EntityManager::create($connection, $config);
    }
}