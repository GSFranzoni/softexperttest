<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\User;

class UserRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return User::class;
    }
}