<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use Symfony\Component\Validator\Constraints\All;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Validator\Constraints\Valid;

class CreatePurchaseDTO extends AbstractDTO
{
    #[NotBlank]
    #[Valid]
    #[Type("array")]
    #[All([
        new Type(CreatePurchasedProductDTO::class),
    ])]
    #[Count(min: 1)]
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