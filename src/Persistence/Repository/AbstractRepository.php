<?php

namespace App\Persistence\Repository;

use App\Persistence\EntityManager\EntityManagerFactory;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Exception\ORMException;

abstract class AbstractRepository extends EntityRepository
{
    /**
     * @throws ORMException
     * @throws Exception
     */
    public function __construct()
    {
        $entityManager = EntityManagerFactory::getEntityManager();

        parent::__construct($entityManager, $entityManager->getClassMetadata($this->getEntityClass()));
    }

    protected abstract function getEntityClass(): string;
}