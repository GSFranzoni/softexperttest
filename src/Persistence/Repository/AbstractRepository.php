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

    /**
     * @param object $entity
     * @return void
     */
    public function save(object $entity): void
    {
        $this->_em->persist($entity);
        $this->_em->flush();
    }

    /**
     * @param object $entity
     * @return void
     */
    public function delete(object $entity): void
    {
        $this->_em->remove($entity);
        $this->_em->flush();
    }

    protected abstract function getEntityClass(): string;
}