<?php

namespace App\Persistence\Repository;

use App\Data\EntityManager\EntityManagerFactory;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

abstract class AbstractRepository
{
    /**
     * @var EntityManager
     */
    private EntityManager $entityManager;

    /**
     * @throws ORMException
     */
    public function __construct()
    {
        $this->entityManager = EntityManagerFactory::getEntityManager();
    }

    public function getAll(): array
    {
        return $this->entityManager->getRepository($this->getEntityClass())->findAll();
    }

    /**
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     * @throws ORMException
     */
    public function getById(int $id): ?object
    {
        return $this->entityManager->find($this->getEntityClass(), $id);
    }

    /**
     * @param object $entity
     * @throws ORMException
     */
    public function save(object $entity): void
    {
        $this->entityManager->persist($entity);
        $this->entityManager->flush();
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function delete(object $entity): void
    {
        $this->entityManager->remove($entity);
        $this->entityManager->flush();
    }

    protected abstract function getEntityClass(): string;
}