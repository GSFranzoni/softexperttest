<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\ProductCategory;

class ProductCategoryRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return ProductCategory::class;
    }
}