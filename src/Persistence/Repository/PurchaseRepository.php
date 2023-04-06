<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\Purchase;

class PurchaseRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return Purchase::class;
    }
}