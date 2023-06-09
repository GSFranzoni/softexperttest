<?php

namespace App\DataTransferObject;

use Symfony\Component\Validator\Constraints\NotBlank;

class CreateProductCategoryDTO extends AbstractDTO
{
    #[NotBlank]
    public string $description;

    #[NotBlank]
    public float $taxId;

    public function __construct(
        string $description,
        float $taxId
    ) {
        $this->description = $description;
        $this->taxId = $taxId;
        
        parent::__construct();
    }
}