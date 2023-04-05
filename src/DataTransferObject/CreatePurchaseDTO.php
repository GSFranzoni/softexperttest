<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;

class CreatePurchaseDTO extends AbstractDTO
{
    /**
     * @var CreatePurchasedProductDTO[]
     */
    public array $products;

    /**
     * @param CreatePurchasedProductDTO[] $products
     * @throws ValidationException
     */
    public function __construct(array $products)
    {
        $this->products = $products;

        parent::__construct();
    }
}