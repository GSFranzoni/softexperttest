<?php

namespace App\Data\EntityManager;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\Tools\Setup;

class EntityManagerFactory
{
    /**
     * @var EntityManager
     */
    private static EntityManager $entityManager;

    /**
     * @return EntityManager
     * @throws ORMException
     */
    public static function getEntityManager(): EntityManager
    {
        if (self::$entityManager !== null) {
            return self::$entityManager;
        }

        $entityDir = __DIR__ . "/Entity";

        $connection = [
            'dbname' => getenv('MYSQL_DATABASE'),
            'user' => getenv('MYSQL_DATABASE'),
            'password' => getenv('MYSQL_PASSWORD'),
            'host' => getenv('MYSQL_HOST'),
            'driver' => 'pdo_mysql',
        ];

        $config = Setup::createAnnotationMetadataConfiguration(
            [$entityDir], getenv('ENVIRONMENT') === 'development'
        );

        self::$entityManager = EntityManager::create($connection, $config);

        return self::$entityManager;
    }
}