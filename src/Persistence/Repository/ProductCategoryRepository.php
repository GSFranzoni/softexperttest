<?php

namespace App\Persistence\Repository;

use App\Data\Entity\ProductCategory;

class ProductCategoryRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return ProductCategory::class;
    }
}