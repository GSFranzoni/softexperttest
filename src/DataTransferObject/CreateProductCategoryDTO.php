<?php

namespace App\DataTransferObject;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class CreateProductCategoryDTO extends AbstractDTO
{
    #[NotBlank]
    public string $description;

    # between 0 and 100
    #[Range(min: 0, max: 100)]
    public float $tax;

    public function __construct(
        string $description,
        float $tax
    ) {
        $this->description = $description;
        $this->tax = $tax;
        
        parent::__construct();
    }
}