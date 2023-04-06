<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\PurchasedProduct;

class PurchasedProductRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return PurchasedProduct::class;
    }
}