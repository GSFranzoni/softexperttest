<?php

namespace App\Persistence\Repository;

use App\Persistence\Entity\ProductCategoryTax;

class ProductCategoryTaxRepository extends AbstractRepository
{
    protected function getEntityClass(): string
    {
        return ProductCategoryTax::class;
    }
}