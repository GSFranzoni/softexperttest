<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Constraints\Type;

class CreatePurchaseDTO extends AbstractDTO
{
    /** @var CreatePurchasedProductDTO[] */
    #[Type("array")]
    #[Range(min: 1)]
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