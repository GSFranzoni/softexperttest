<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class CreatePurchasedProductDTO extends AbstractDTO
{
    #[NotBlank]
    public int $productId;

    #[Range(min: 1)]
    public int $quantity;

    /**
     * @param int $productId
     * @param int $quantity
     * @throws ValidationException
     */
    public function __construct(int $productId, int $quantity)
    {
        $this->productId = $productId;
        $this->quantity = $quantity;

        parent::__construct();
    }
}