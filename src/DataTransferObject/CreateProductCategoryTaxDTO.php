<?php

namespace App\DataTransferObject;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class CreateProductCategoryTaxDTO extends AbstractDTO
{
    #[NotBlank]
    public string $description;

    #[Range(min: 0, max: 100)]
    public float $percent;

    public function __construct(
        string $description,
        float $percent
    ) {
        $this->description = $description;
        $this->percent = $percent;
        
        parent::__construct();
    }
}