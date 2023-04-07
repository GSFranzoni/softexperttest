<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class CreatePurchasedProductDTO extends AbstractDTO
{
    #[NotBlank]
    public int $id;

    #[Range(min: 1)]
    public int $quantity;

    /**
     * @param int $id
     * @param int $quantity
     * @throws ValidationException
     */
    public function __construct(int $id, int $quantity)
    {
        $this->id = $id;
        $this->quantity = $quantity;

        parent::__construct();
    }
}