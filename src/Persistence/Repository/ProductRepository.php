<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\Product;

class ProductRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return Product::class;
    }
}