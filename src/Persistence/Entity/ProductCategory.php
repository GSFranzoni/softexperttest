<?php

namespace App\Data\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;

/**
 * @ORM\Embeddable
 */
class ProductCategory
{
    /** @var ?int */
    #[Id]
    #[Column(name: 'id', type: 'integer')]
    #[GeneratedValue(strategy: 'IDENTITY')]
    private int | null $id;

    /** @var string */
    #[Column(name: 'description', type: 'string', length: 255, nullable: false)]
    private string $description;

    /** @var float */
    #[Column(name: 'tax', type: 'float', nullable: false)]
    private float $tax;

    /**
     * @param string $description
     * @param float $tax
     */
    public function __construct(string $description, float $tax)
    {
        $this->description = $description;
        $this->tax = $tax;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param int|null $id
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return float
     */
    public function getTax(): float
    {
        return $this->tax;
    }

    /**
     * @param float $tax
     */
    public function setTax(float $tax): void
    {
        $this->tax = $tax;
    }
}