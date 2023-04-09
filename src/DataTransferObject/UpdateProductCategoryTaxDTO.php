<?php

namespace App\DataTransferObject;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class UpdateProductCategoryTaxDTO extends AbstractDTO
{
    #[NotBlank]
    public int $id;

    #[NotBlank]
    public string $description;

    #[Range(min: 0, max: 1)]
    public float $percent;

    public function __construct(
        int    $id,
        string $description,
        float  $percent
    ) {
        $this->id = $id;
        $this->description = $description;
        $this->percent = $percent;

        parent::__construct();
    }
}