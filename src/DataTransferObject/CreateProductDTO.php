<?php

namespace App\DataTransferObject;

class CreateProductDTO extends AbstractDTO
{
    public function __construct(
        public string $name,
        public string $description,
        public float $price,
        public int $stock,
        public int $productCategoryId
    )
    {
        parent::__construct();
    }
}