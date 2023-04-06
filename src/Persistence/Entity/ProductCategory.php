<?php

namespace App\Persistence\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToMany;
use JsonSerializable;

#[ORM\Entity]
#[ORM\Table(name: 'products_category')]
class ProductCategory implements JsonSerializable
{
    #[Id]
    #[Column(name: 'id', type: 'integer')]
    #[GeneratedValue(strategy: 'AUTO')]
    private int | null $id;

    #[Column(name: 'description', type: Types::STRING, length: 255, nullable: false)]
    private string $description;

    #[Column(name: 'tax', type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private float $tax;

    #[OneToMany(mappedBy: 'category', targetEntity: Product::class, cascade: ['persist', 'remove'])]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
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

    /**
     * @return ArrayCollection|Collection
     */
    public function getProducts(): ArrayCollection|Collection
    {
        return $this->products;
    }

    /**
     * @param ArrayCollection|Collection $products
     */
    public function setProducts(ArrayCollection|Collection $products): void
    {
        $this->products = $products;
    }

    /**
     * @param Product $product
     */
    public function addProduct(Product $product): void
    {
        $this->products->add($product);
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'tax' => $this->tax
        ];
    }
}