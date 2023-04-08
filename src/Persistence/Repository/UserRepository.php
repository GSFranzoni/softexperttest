<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\User;

class UserRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return User::class;
    }

    /**
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return $this->entityManager->getRepository($this->getEntityClass())->findOneBy(['email' => $email]);
    }
}