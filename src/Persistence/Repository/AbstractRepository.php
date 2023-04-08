<?php

namespace App\Persistence\Repository;

use App\Persistence\EntityManager\EntityManagerFactory;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

abstract class AbstractRepository
{
    /**
     * @var EntityManager
     */
    protected EntityManager $entityManager;

    /**
     * @throws ORMException
     * @throws Exception
     */
    public function __construct()
    {
        $this->entityManager = EntityManagerFactory::getEntityManager();
    }

    /**
     * @param int $page
     * @param int $limit
     * @return array
     */
    public function getAll(int $page = 1, int $limit = 10): array
    {
        return $this->entityManager->getRepository($this->getEntityClass())->findBy([], [], $limit, ($page - 1) * $limit);
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

    /**
     * @return int
     */
    public function count(): int
    {
        return $this->entityManager->getRepository($this->getEntityClass())->count([]);
    }

    protected abstract function getEntityClass(): string;
}